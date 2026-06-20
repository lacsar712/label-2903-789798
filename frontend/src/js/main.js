// ECharts Dark Theme Configuration
const echartsTheme = {
    color: ['#38bdf8', '#818cf8', '#c084fc', '#f472b6', '#fbbf24', '#10b981'],
    textStyle: { color: '#94a3b8' }
};

const MAP_COLOR_SCHEMES = {
    cool: ['#1e293b', '#38bdf8', '#818cf8', '#a78bfa'],
    warm: ['#1e293b', '#fbbf24', '#f97316', '#ef4444']
};

let charts = {};
let currentSelection = {
    brand: '',
    city: '北京',
    drillDown: false
};

function getMapColors() {
    const scheme = (window.systemConfig && window.systemConfig.mapColorScheme) || 'cool';
    return MAP_COLOR_SCHEMES[scheme] || MAP_COLOR_SCHEMES.cool;
}

function getInitialCity() {
    const urlParams = new URLSearchParams(window.location.search);
    const urlCity = urlParams.get('city');
    if (urlCity) return urlCity;

    const storedCity = localStorage.getItem('user_preferred_city');
    if (storedCity) return storedCity;

    if (window.systemConfig && window.systemConfig.defaultCity) {
        return window.systemConfig.defaultCity;
    }
    return '北京';
}

function initCharts() {
    const ids = ['barChart', 'pieChart', 'lineChart', 'scatterChart', 'mapChart'];
    ids.forEach(id => {
        const el = document.getElementById(id);
        if (el) charts[id] = echarts.init(el);
    });

    // Interaction Events
    if (charts.barChart) {
        charts.barChart.on('click', function (params) {
            // Drill down: If brand filter is empty, and user clicks a model, 
            // maybe we extract the brand or just set the brand filter to that specific brand.
            // Simplified: Filter everything by this brand
            const brandSelect = document.getElementById('brandFilter');
            // Check if name is a brand or a specific model. 
            // In our current API, labels are model names. We might need brand info.
            // For this version: just toast and filter by brand if it matches known brands.
            const brands = ['特斯拉', '比亚迪', '蔚来', '小鹏'];
            if (brands.includes(params.name)) {
                brandSelect.value = params.name;
                refreshCharts();
            } else {
                // It's a model name. We can find the brand? 
                // Let's assume user wants to filter by this specific selection.
            }
        });
    }

    if (charts.pieChart) {
        charts.pieChart.on('click', function (params) {
            document.getElementById('brandFilter').value = params.name;
            refreshCharts();
            showToast(`已筛选品牌: ${params.name}`, 'info');
        });
    }
}

function getFilterParams() {
    const brand = document.getElementById('brandFilter').value;
    const city = document.getElementById('cityFilter').value;
    const pMin = document.getElementById('priceMin').value;
    const pMax = document.getElementById('priceMax').value;
    const rMin = document.getElementById('rangeMin').value;

    const categories = Array.from(document.querySelectorAll('.cat-filter:checked')).map(cb => cb.value);

    const sortField = document.getElementById('sortField').value;
    const sortOrder = document.getElementById('sortOrder').value;

    let url = `?brand=${brand}&city=${city}&price_min=${pMin}&price_max=${pMax}&range_min=${rMin}&sort_field=${sortField}&sort_order=${sortOrder}`;
    categories.forEach(c => url += `&category[]=${c}`);
    return url;
}

async function loadLineChart() {
    const brand = document.getElementById('brandFilter').value;
    const res = await fetch(`/api/chart/line?brand=${brand}`);
    const data = await res.json();

    charts.lineChart.setOption({
        title: { text: brand ? `${brand} 销量趋势` : '全行业销量趋势', textStyle: { color: '#94a3b8', fontSize: 14 } },
        tooltip: { trigger: 'axis' },
        xAxis: { type: 'category', data: data.periods, boundaryGap: false },
        yAxis: { type: 'value', splitLine: { lineStyle: { color: '#334155' } } },
        series: [{
            name: '销量',
            data: data.sales,
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 8,
            lineStyle: { width: 4, color: '#38bdf8' },
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: 'rgba(56, 189, 248, 0.4)' },
                    { offset: 1, color: 'rgba(56, 189, 248, 0)' }
                ])
            }
        }]
    }, true);
}

async function loadPieChart() {
    const city = document.getElementById('cityFilter').value;
    const res = await fetch(`/api/chart/pie?city=${city}`);
    const data = await res.json();

    charts.pieChart.setOption({
        title: { text: `${city} 品牌占比`, left: 'center', textStyle: { color: '#94a3b8', fontSize: 14 } },
        tooltip: { trigger: 'item' },
        series: [{
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: { borderRadius: 10, borderColor: '#1e293b', borderWidth: 2 },
            label: { show: false },
            emphasis: { label: { show: true, fontSize: 16, fontWeight: 'bold', color: '#fff' } },
            data: data
        }]
    });
}

async function loadScatterChart() {
    const params = getFilterParams();
    const res = await fetch(`/api/chart/scatter${params}`);
    const data = await res.json();

    charts.scatterChart.setOption({
        title: { text: '车身重量与电耗相关性', textStyle: { color: '#94a3b8', fontSize: 14 } },
        tooltip: {
            formatter: params => `${params.data[2]}<br/>重量: ${params.data[0]}kg<br/>电耗: ${params.data[1]}kWh/100km`
        },
        xAxis: { name: '重量 (kg)', splitLine: { lineStyle: { color: '#334155' } } },
        yAxis: { name: '电耗 (kWh)', splitLine: { lineStyle: { color: '#334155' } } },
        series: [{
            symbolSize: (data) => Math.sqrt(data[0]) / 2,
            data: data.weight_power,
            type: 'scatter',
            itemStyle: { color: '#f472b6', shadowBlur: 10, shadowColor: 'rgba(244, 114, 182, 0.5)' }
        }]
    });
}
let mapGeoCache = null;

async function loadMapChart() {
    const mapMode = document.getElementById('mapMode').value;
    const params = getFilterParams();
    const res = await fetch(`/api/chart/map${params}&mode=${mapMode}`);
    const data = await res.json();

    const mapUrl = 'https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json';

    try {
        if (!mapGeoCache) {
            const mapRes = await fetch(mapUrl);
            mapGeoCache = await mapRes.json();
            echarts.registerMap('china', mapGeoCache);
        }

        const vals = data.data.map(d => d.value).filter(v => v > 0);
        const maxVal = vals.length > 0 ? Math.max(...vals) : (mapMode === 'density' ? 50 : 20000);

        const mapColors = getMapColors();
        charts.mapChart.setOption({
            title: { text: data.title + ' (可滚轮缩放)', textStyle: { color: '#94a3b8', fontSize: 14 } },
            visualMap: {
                min: 0, max: maxVal > 0 ? maxVal : 100, left: 'right', top: 'bottom', text: ['高', '低'],
                calculable: true, inRange: { color: mapColors },
                textStyle: { color: '#94a3b8' }
            },
            tooltip: {
                trigger: 'item',
                formatter: function (params) {
                    const val = params.value ? params.value : 0;
                    const unit = mapMode === 'density' ? '个/km²' : '辆';
                    return `${params.name}<br/>${mapMode === 'density' ? '密度' : '销量'}: ${val} ${unit}`;
                }
            },
            series: [{
                name: mapMode === 'density' ? '密度' : '销量', type: 'map', mapType: 'china', roam: true,
                emphasis: { label: { color: '#fff' }, itemStyle: { areaColor: '#a78bfa' } },
                data: data.data
            }]
        });
    } catch (e) {
        console.error('Map loading failed:', e);
        showToast('地图加载失败，请检查网络', 'danger');
    }
}

function refreshCharts() {
    loadBarChart();
    loadLineChart();
    loadPieChart();
    loadScatterChart();
    loadMapChart();
}

function initCityFilter() {
    const cityFilter = document.getElementById('cityFilter');
    if (!cityFilter) return;

    const initialCity = getInitialCity();
    cityFilter.value = initialCity;
    currentSelection.city = initialCity;
}

function saveCityPreference(city) {
    if (city) {
        localStorage.setItem('user_preferred_city', city);
    }
}

// Add event listeners for automatic refreshing
window.addEventListener('load', () => {
    initCharts();
    if (charts.barChart) {
        initCityFilter();
        refreshCharts();

        // Auto-refresh when dropdowns change
        const autoFilters = ['brandFilter', 'cityFilter', 'sortField', 'sortOrder', 'mapMode'];
        autoFilters.forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                el.onchange = function() {
                    if (id === 'cityFilter') {
                        saveCityPreference(this.value);
                        currentSelection.city = this.value;
                    }
                    refreshCharts();
                };
            }
        });

        // Auto-refresh for checkboxes
        document.querySelectorAll('.cat-filter').forEach(cb => {
            cb.onchange = refreshCharts;
        });

        // Debounced refresh for number inputs
        let debounceTimer;
        const numInputs = ['priceMin', 'priceMax', 'rangeMin'];
        numInputs.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.oninput = () => {
                clearTimeout(debounceTimer);
                debounceTimer = setTimeout(refreshCharts, 500);
            };
        });
    }
});

// Custom UI Components
function showToast(msg, type = 'info') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.style.borderLeftColor = type === 'success' ? '#10b981' : (type === 'danger' ? '#f43f5e' : '#38bdf8');
    toast.innerHTML = `<span>${msg}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => toast.remove(), 400);
    }, 3000);
}

function showModal(title, msg, onConfirm) {
    const overlay = document.getElementById('modalOverlay');
    document.getElementById('modalTitle').innerText = title;
    document.getElementById('modalMsg').innerText = msg;
    overlay.style.display = 'flex';

    const confirmBtn = document.getElementById('modalConfirm');
    const cancelBtn = document.getElementById('modalCancel');

    const close = () => overlay.style.display = 'none';

    confirmBtn.onclick = () => { onConfirm(); close(); };
    cancelBtn.onclick = close;
    overlay.onclick = (e) => { if (e.target === overlay) close(); };
}

function initDB() {
    showModal('重置数据库', '确定要删除现有记录并初始化模拟数据吗？', () => {
        fetch('/admin/init_db')
            .then(r => r.json())
            .then(d => {
                showToast(d.status, 'success');
                refreshCharts();
            })
            .catch(() => showToast('初始化失败', 'danger'));
    });
}

window.addEventListener('load', () => {
    initCharts();
    if (charts.barChart) refreshCharts();
});

window.addEventListener('resize', () => {
    Object.values(charts).forEach(c => c.resize());
});

// ============ URL Parameter Handling for Review Board Navigation ============

function getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        brand: params.get('brand'),
        model: params.get('model')
    };
}

function applyUrlParamsOnLoad() {
    const { brand, model } = getUrlParams();
    
    if (!brand && !model) return;
    
    if (brand) {
        const brandSelect = document.getElementById('brandFilter');
        if (brandSelect) {
            const brandOption = Array.from(brandSelect.options).find(
                opt => opt.value === brand || opt.textContent === brand
            );
            if (brandOption) {
                brandSelect.value = brandOption.value;
                showToast(`已定位至品牌: ${brand}`, 'info');
            }
        }
    }
    
    setTimeout(() => {
        refreshCharts();
        
        if (model) {
            setTimeout(() => {
                highlightModelInTable(model);
            }, 500);
        }
    }, 100);
}

function highlightModelInTable(modelName) {
    const tableBody = document.getElementById('dashboardTableBody');
    if (!tableBody) return;
    
    const rows = tableBody.querySelectorAll('tr');
    let found = false;
    
    rows.forEach(row => {
        const firstCell = row.querySelector('td:first-child');
        if (firstCell && firstCell.textContent.trim() === modelName) {
            row.style.background = 'rgba(56, 189, 248, 0.15)';
            row.style.transition = 'background 0.3s';
            row.scrollIntoView({ behavior: 'smooth', block: 'center' });
            found = true;
            
            setTimeout(() => {
                row.style.animation = 'modelHighlight 2s ease-out';
            }, 100);
            
            showToast(`已定位至车型: ${modelName}`, 'success');
        }
    });
    
    if (!found) {
        showToast(`车型 ${modelName} 不在当前筛选结果中`, 'info');
    }
}

const style = document.createElement('style');
style.textContent = `
    @keyframes modelHighlight {
        0% { background: rgba(56, 189, 248, 0.3); }
        50% { background: rgba(56, 189, 248, 0.1); }
        100% { background: transparent; }
    }
`;
document.head.appendChild(style);

window.addEventListener('load', () => {
    if (document.getElementById('brandFilter')) {
        setTimeout(applyUrlParamsOnLoad, 200);
    }
});

// ============ Onboarding Tour ============
const tourSteps = [
    {
        target: '#tour-filter-pane',
        title: '筛选面板',
        description: '在这里您可以按品牌、城市、价格、续航等多维度筛选数据。调整筛选条件后，所有图表会自动更新。',
        placement: 'bottom'
    },
    {
        target: '#tour-bar-chart',
        title: '多维柱状图',
        description: '展示各车型的续航、价格、电耗等参数对比。点击柱状图中的品牌，可以快速筛选查看特定品牌的数据。',
        placement: 'right'
    },
    {
        target: '#tour-map-mode',
        title: '地图维度切换',
        description: '在「销量热力分布」和「充电桩密度」两种视图间切换，从不同角度洞察市场数据。',
        placement: 'bottom'
    },
    {
        target: '#tour-pie-chart',
        title: '区域饼图',
        description: '展示当前所选城市的各品牌市场份额。点击饼图中的品牌区块，可快速筛选该品牌数据。',
        placement: 'left'
    }
];

let tourCurrentStep = 0;
let tourIsManual = false;
let tourOverlay = null;
let tourHighlight = null;
let tourTooltip = null;

function initTourElements() {
    if (tourOverlay) return;

    tourOverlay = document.createElement('div');
    tourOverlay.className = 'tour-overlay';
    document.body.appendChild(tourOverlay);

    tourHighlight = document.createElement('div');
    tourHighlight.className = 'tour-highlight';
    document.body.appendChild(tourHighlight);

    tourTooltip = document.createElement('div');
    tourTooltip.className = 'tour-tooltip';
    document.body.appendChild(tourTooltip);
}

function positionTourElement(step) {
    const target = document.querySelector(step.target);
    if (!target) return false;

    const rect = target.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

    const padding = 8;

    tourHighlight.style.top = (rect.top + scrollTop - padding) + 'px';
    tourHighlight.style.left = (rect.left + scrollLeft - padding) + 'px';
    tourHighlight.style.width = (rect.width + padding * 2) + 'px';
    tourHighlight.style.height = (rect.height + padding * 2) + 'px';

    const tooltipWidth = 320;
    const tooltipHeight = 200;
    const gap = 16;

    let tipTop, tipLeft;
    let placement = step.placement;

    if (placement === 'bottom') {
        tipTop = rect.bottom + scrollTop + gap;
        tipLeft = rect.left + scrollLeft + rect.width / 2 - tooltipWidth / 2;
    } else if (placement === 'top') {
        tipTop = rect.top + scrollTop - tooltipHeight - gap;
        tipLeft = rect.left + scrollLeft + rect.width / 2 - tooltipWidth / 2;
    } else if (placement === 'right') {
        tipTop = rect.top + scrollTop + rect.height / 2 - tooltipHeight / 2;
        tipLeft = rect.right + scrollLeft + gap;
    } else if (placement === 'left') {
        tipTop = rect.top + scrollTop + rect.height / 2 - tooltipHeight / 2;
        tipLeft = rect.left + scrollLeft - tooltipWidth - gap;
    }

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    if (tipLeft < 20) tipLeft = 20;
    if (tipLeft + tooltipWidth > viewportWidth - 20) tipLeft = viewportWidth - tooltipWidth - 20;

    if (tipTop < scrollTop + 20) {
        tipTop = rect.bottom + scrollTop + gap;
        placement = 'bottom';
    }
    if (tipTop + tooltipHeight > scrollTop + viewportHeight - 20) {
        tipTop = rect.top + scrollTop - tooltipHeight - gap;
        placement = 'top';
    }

    tourTooltip.className = 'tour-tooltip ' + placement;
    tourTooltip.style.top = tipTop + 'px';
    tourTooltip.style.left = tipLeft + 'px';

    target.scrollIntoView({ behavior: 'smooth', block: 'center' });

    return true;
}

function renderTourStep() {
    const step = tourSteps[tourCurrentStep];
    if (!positionTourElement(step)) {
        endTour();
        return;
    }

    const dots = tourSteps.map((_, i) =>
        `<div class="tour-dot ${i === tourCurrentStep ? 'active' : ''}"></div>`
    ).join('');

    const isLast = tourCurrentStep === tourSteps.length - 1;

    tourTooltip.innerHTML = `
        <div class="tour-step-num">第 ${tourCurrentStep + 1} 步 / 共 ${tourSteps.length} 步</div>
        <div class="tour-progress">${dots}</div>
        <h4>${step.title}</h4>
        <p>${step.description}</p>
        <div class="tour-tooltip-actions">
            <button class="tour-btn-skip" onclick="endTour()">${isLast ? '完成' : '跳过引导'}</button>
            <button class="tour-btn-next" onclick="nextTourStep()">${isLast ? '完成' : '继续'}</button>
        </div>
    `;
}

function nextTourStep() {
    if (tourCurrentStep < tourSteps.length - 1) {
        tourCurrentStep++;
        renderTourStep();
    } else {
        endTour();
    }
}

function endTour() {
    if (tourOverlay) {
        tourOverlay.classList.remove('active');
        setTimeout(() => {
            if (tourOverlay && tourOverlay.parentNode) tourOverlay.parentNode.removeChild(tourOverlay);
            if (tourHighlight && tourHighlight.parentNode) tourHighlight.parentNode.removeChild(tourHighlight);
            if (tourTooltip && tourTooltip.parentNode) tourTooltip.parentNode.removeChild(tourTooltip);
            tourOverlay = null;
            tourHighlight = null;
            tourTooltip = null;
        }, 300);
    }

    if (!tourIsManual) {
        markTourAsSeen();
    }

    tourIsManual = false;
    tourCurrentStep = 0;
}

async function markTourAsSeen() {
    try {
        await fetch('/api/user/tour_status', { method: 'POST' });
    } catch (e) {
        console.error('Failed to mark tour as seen:', e);
    }
}

async function checkAndStartTour() {
    try {
        const res = await fetch('/api/user/tour_status');
        const data = await res.json();
        if (!data.has_seen_tour) {
            startTour(false);
        }
    } catch (e) {
        console.error('Failed to check tour status:', e);
    }
}

function startTour(isManual = false) {
    tourIsManual = isManual;
    tourCurrentStep = 0;

    initTourElements();
    tourOverlay.style.display = 'block';
    requestAnimationFrame(() => {
        tourOverlay.classList.add('active');
    });

    setTimeout(() => renderTourStep(), 100);

    tourOverlay.onclick = (e) => {
        if (e.target === tourOverlay) {
            endTour();
        }
    };

    const handleResize = () => {
        if (tourTooltip) {
            renderTourStep();
        }
    };
    window.addEventListener('resize', handleResize);
}

function startTourManual() {
    startTour(true);
}

window.addEventListener('load', () => {
    if (document.getElementById('tour-filter-pane')) {
        const manualTour = localStorage.getItem('manual_tour');
        if (manualTour === 'true') {
            localStorage.removeItem('manual_tour');
            setTimeout(() => startTour(true), 800);
        } else {
            setTimeout(checkAndStartTour, 800);
        }
    }
});

// ============ Filter Preset Management ============

let presetList = [];
let selectedPresetId = null;
let isEditMode = false;
let editingPresetId = null;

function getCurrentFilters() {
    const brand = document.getElementById('brandFilter').value;
    const city = document.getElementById('cityFilter').value;
    const priceMin = document.getElementById('priceMin').value;
    const priceMax = document.getElementById('priceMax').value;
    const rangeMin = document.getElementById('rangeMin').value;
    const categories = Array.from(document.querySelectorAll('.cat-filter:checked')).map(cb => cb.value);
    const sortField = document.getElementById('sortField').value;
    const sortOrder = document.getElementById('sortOrder').value;
    const mapMode = document.getElementById('mapMode').value;

    return {
        brand,
        city,
        priceMin,
        priceMax,
        rangeMin,
        categories,
        sortField,
        sortOrder,
        mapMode
    };
}

function applyFilters(filters) {
    if (!filters) return;

    document.getElementById('brandFilter').value = filters.brand || '';
    document.getElementById('cityFilter').value = filters.city || '北京';
    document.getElementById('priceMin').value = filters.priceMin || '';
    document.getElementById('priceMax').value = filters.priceMax || '';
    document.getElementById('rangeMin').value = filters.rangeMin || '';
    document.getElementById('sortField').value = filters.sortField || 'model_name';
    document.getElementById('sortOrder').value = filters.sortOrder || 'asc';
    document.getElementById('mapMode').value = filters.mapMode || 'sales';

    const allCategories = ['纯电', '混动'];
    allCategories.forEach(cat => {
        const cb = document.querySelector(`.cat-filter[value="${cat}"]`);
        if (cb) cb.checked = filters.categories ? filters.categories.includes(cat) : true;
    });

    refreshCharts();
}

async function loadPresetList() {
    try {
        const res = await fetch('/api/filter_presets');
        if (!res.ok) throw new Error('加载失败');
        presetList = await res.json();
        renderPresetDropdown();
    } catch (e) {
        console.error('Failed to load presets:', e);
        showToast('加载方案列表失败', 'danger');
    }
}

function renderPresetDropdown() {
    const select = document.getElementById('presetSelect');
    if (!select) return;

    const prevValue = select.value;
    select.innerHTML = '<option value="">-- 选择已保存方案 --</option>';

    const minePresets = presetList.filter(p => p.is_mine);
    const publicPresets = presetList.filter(p => !p.is_mine && p.is_public);

    if (minePresets.length > 0) {
        const groupMine = document.createElement('optgroup');
        groupMine.label = '★ 我的方案';
        minePresets.forEach(p => {
            const opt = document.createElement('option');
            opt.value = p.id;
            let name = p.name;
            if (p.is_public) name += ' [公共]';
            opt.textContent = name;
            if (p.is_public) {
                opt.style.color = '#fbbf24';
                opt.style.fontWeight = '600';
            }
            groupMine.appendChild(opt);
        });
        select.appendChild(groupMine);
    }

    if (publicPresets.length > 0) {
        const groupPublic = document.createElement('optgroup');
        groupPublic.label = '🌐 公共方案（团队共享）';
        publicPresets.forEach(p => {
            const opt = document.createElement('option');
            opt.value = p.id;
            opt.textContent = `${p.name}  (创建者: ${p.owner_name})`;
            opt.style.color = '#34d399';
            opt.style.fontWeight = '600';
            groupPublic.appendChild(opt);
        });
        select.appendChild(groupPublic);
    }

    select.value = prevValue;
    if (select.value) {
        onPresetSelectChange(select);
    } else {
        updatePresetButtons(null);
    }
}

function getPresetById(id) {
    return presetList.find(p => p.id === parseInt(id));
}

function onPresetSelectChange(select) {
    const id = select.value;
    selectedPresetId = id ? parseInt(id) : null;
    const preset = selectedPresetId ? getPresetById(selectedPresetId) : null;
    updatePresetButtons(preset);
    updatePresetInfo(preset);
}

function updatePresetButtons(preset) {
    const btnApply = document.getElementById('btnApplyPreset');
    const btnEdit = document.getElementById('btnEditPreset');
    const btnDelete = document.getElementById('btnDeletePreset');
    const btnTogglePublic = document.getElementById('btnTogglePublic');
    const btnTogglePublicText = document.getElementById('btnTogglePublicText');

    if (btnApply) btnApply.disabled = !preset;
    if (btnEdit) btnEdit.disabled = !preset || !preset.can_edit;
    if (btnDelete) btnDelete.disabled = !preset || !preset.can_delete;

    if (btnTogglePublic) {
        btnTogglePublic.disabled = !preset || !preset.can_toggle_public;
        if (btnTogglePublicText) {
            btnTogglePublicText.textContent = preset && preset.is_public ? '取消公共' : '标记公共';
        }
    }
}

function updatePresetInfo(preset) {
    const infoDiv = document.getElementById('presetInfo');
    const infoContent = document.getElementById('presetInfoContent');
    if (!infoDiv || !infoContent) return;

    if (!preset) {
        infoDiv.style.display = 'none';
        return;
    }

    infoDiv.style.display = 'block';
    let tags = [];
    if (preset.is_mine) tags.push('<span class="preset-tag preset-tag-mine">我的</span>');
    if (preset.is_public) tags.push('<span class="preset-tag preset-tag-public">公共</span>');
    tags.push(`<span class="preset-tag preset-tag-owner">创建者: ${preset.owner_name}</span>`);
    tags.push(`<span class="preset-tag preset-tag-time">${preset.created_at}</span>`);

    infoContent.innerHTML = tags.join(' ');
}

function openSavePresetModal() {
    isEditMode = false;
    editingPresetId = null;
    document.getElementById('presetModalTitle').textContent = '保存筛选方案';
    document.getElementById('presetNameInput').value = '';
    document.getElementById('confirmSavePresetBtn').textContent = '确定保存';
    document.getElementById('savePresetModal').style.display = 'flex';
    setTimeout(() => document.getElementById('presetNameInput').focus(), 100);
}

function closePresetModal() {
    document.getElementById('savePresetModal').style.display = 'none';
}

async function confirmSavePreset() {
    const nameInput = document.getElementById('presetNameInput');
    const name = nameInput.value.trim();

    if (!name) {
        showToast('请输入方案名称', 'danger');
        nameInput.focus();
        return;
    }

    const filters = getCurrentFilters();

    try {
        let res;
        if (isEditMode && editingPresetId) {
            res = await fetch(`/api/filter_presets/${editingPresetId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, filters })
            });
        } else {
            res = await fetch('/api/filter_presets', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, filters })
            });
        }

        const data = await res.json();

        if (!res.ok) {
            showToast(data.error || '保存失败', 'danger');
            return;
        }

        showToast(isEditMode ? '方案已更新' : '方案保存成功', 'success');
        closePresetModal();
        await loadPresetList();

        if (data.id) {
            const select = document.getElementById('presetSelect');
            if (select) select.value = data.id;
            selectedPresetId = data.id;
            onPresetSelectChange(select);
        }
    } catch (e) {
        console.error('Save preset failed:', e);
        showToast('保存失败，请重试', 'danger');
    }
}

function openRenamePresetModal() {
    if (!selectedPresetId) {
        showToast('请先选择一个方案', 'danger');
        return;
    }

    const preset = getPresetById(selectedPresetId);
    if (!preset || !preset.can_edit) {
        showToast('无权限修改此方案', 'danger');
        return;
    }

    document.getElementById('renamePresetInput').value = preset.name;
    document.getElementById('renamePresetModal').style.display = 'flex';
    setTimeout(() => {
        const input = document.getElementById('renamePresetInput');
        input.focus();
        input.select();
    }, 100);
}

function closeRenamePresetModal() {
    document.getElementById('renamePresetModal').style.display = 'none';
}

async function confirmRenamePreset() {
    if (!selectedPresetId) return;

    const input = document.getElementById('renamePresetInput');
    const newName = input.value.trim();

    if (!newName) {
        showToast('名称不能为空', 'danger');
        input.focus();
        return;
    }

    try {
        const res = await fetch(`/api/filter_presets/${selectedPresetId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: newName })
        });

        const data = await res.json();
        if (!res.ok) {
            showToast(data.error || '重命名失败', 'danger');
            return;
        }

        showToast('方案已重命名', 'success');
        closeRenamePresetModal();
        await loadPresetList();

        const select = document.getElementById('presetSelect');
        if (select) {
            select.value = selectedPresetId;
            onPresetSelectChange(select);
        }
    } catch (e) {
        console.error('Rename preset failed:', e);
        showToast('重命名失败', 'danger');
    }
}

async function deleteSelectedPreset() {
    if (!selectedPresetId) {
        showToast('请先选择一个方案', 'danger');
        return;
    }

    const preset = getPresetById(selectedPresetId);
    if (!preset) return;

    if (!preset.can_delete) {
        showToast('无权限删除此方案', 'danger');
        return;
    }

    showModal(
        '删除方案',
        `确定要删除方案「${preset.name}」吗？此操作不可恢复。`,
        async () => {
            try {
                const res = await fetch(`/api/filter_presets/${selectedPresetId}`, {
                    method: 'DELETE'
                });

                if (!res.ok) {
                    const data = await res.json();
                    showToast(data.error || '删除失败', 'danger');
                    return;
                }

                showToast('方案已删除', 'success');
                selectedPresetId = null;
                await loadPresetList();
            } catch (e) {
                console.error('Delete preset failed:', e);
                showToast('删除失败', 'danger');
            }
        }
    );
}

async function applySelectedPreset() {
    if (!selectedPresetId) {
        showToast('请先选择一个方案', 'danger');
        return;
    }

    const preset = getPresetById(selectedPresetId);
    if (!preset) return;

    applyFilters(preset.filters);
    showToast(`已应用方案「${preset.name}」`, 'success');
}

async function togglePresetPublic() {
    if (!selectedPresetId) {
        showToast('请先选择一个方案', 'danger');
        return;
    }

    const preset = getPresetById(selectedPresetId);
    if (!preset || !preset.can_toggle_public) {
        showToast('无权限操作', 'danger');
        return;
    }

    const action = preset.is_public ? '取消公共标记' : '标记为公共方案';
    showModal(
        action,
        preset.is_public
            ? `确定要取消方案「${preset.name}」的公共标记吗？其他用户将无法再使用此方案。`
            : `确定要将方案「${preset.name}」标记为公共方案吗？所有用户都可以查看和使用此方案。`,
        async () => {
            try {
                const res = await fetch(`/api/filter_presets/${selectedPresetId}/toggle_public`, {
                    method: 'POST'
                });

                const data = await res.json();
                if (!res.ok) {
                    showToast(data.error || '操作失败', 'danger');
                    return;
                }

                showToast(
                    data.is_public ? `方案「${data.name}」已标记为公共` : `方案「${data.name}」已取消公共`,
                    'success'
                );
                await loadPresetList();

                const select = document.getElementById('presetSelect');
                if (select) {
                    select.value = selectedPresetId;
                    onPresetSelectChange(select);
                }
            } catch (e) {
                console.error('Toggle public failed:', e);
                showToast('操作失败', 'danger');
            }
        }
    );
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('presetSelect')) {
        loadPresetList();
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closePresetModal();
            closeRenamePresetModal();
        }
        if (e.key === 'Enter') {
            const saveModal = document.getElementById('savePresetModal');
            if (saveModal && saveModal.style.display === 'flex') {
                confirmSavePreset();
            }
            const renameModal = document.getElementById('renamePresetModal');
            if (renameModal && renameModal.style.display === 'flex') {
                confirmRenamePreset();
            }
        }
    });
});

const overlaySave = document.getElementById('savePresetModal');
if (overlaySave) {
    overlaySave.addEventListener('click', (e) => {
        if (e.target === overlaySave) closePresetModal();
    });
}

const overlayRename = document.getElementById('renamePresetModal');
if (overlayRename) {
    overlayRename.addEventListener('click', (e) => {
        if (e.target === overlayRename) closeRenamePresetModal();
    });
}

// ============ Notification Bell & Panel ============

let notificationPanelOpen = false;

function toggleNotificationPanel() {
    const panel = document.getElementById('notificationPanel');
    if (!panel) return;
    notificationPanelOpen = !notificationPanelOpen;
    panel.style.display = notificationPanelOpen ? 'block' : 'none';
    if (notificationPanelOpen) {
        loadNotifications();
    }
}

document.addEventListener('click', (e) => {
    const wrap = document.getElementById('notificationBellWrap');
    if (wrap && !wrap.contains(e.target)) {
        const panel = document.getElementById('notificationPanel');
        if (panel) {
            panel.style.display = 'none';
            notificationPanelOpen = false;
        }
    }
});

async function refreshNotificationBadge() {
    const badge = document.getElementById('notificationBadge');
    if (!badge) return;
    try {
        const res = await fetch('/api/alert/notifications/unread_count');
        const data = await res.json();
        if (data.unread_count > 0) {
            badge.style.display = 'inline-flex';
            badge.textContent = data.unread_count > 99 ? '99+' : data.unread_count;
        } else {
            badge.style.display = 'none';
        }
    } catch (e) {
        console.error('Failed to refresh badge:', e);
    }
}
window.refreshNotificationBadge = refreshNotificationBadge;

async function loadNotifications() {
    const list = document.getElementById('notificationList');
    if (!list) return;
    try {
        const res = await fetch('/api/alert/notifications');
        const notifications = await res.json();
        renderNotifications(notifications);
    } catch (e) {
        console.error('Failed to load notifications:', e);
        list.innerHTML = '<div class="notification-empty">加载失败</div>';
    }
}

function renderNotifications(notifications) {
    const list = document.getElementById('notificationList');
    if (!list) return;

    if (!notifications || notifications.length === 0) {
        list.innerHTML = '<div class="notification-empty">暂无异动通知</div>';
        return;
    }

    list.innerHTML = notifications.map(n => {
        const snapshot = n.snapshot || {};
        const periods = snapshot.periods || [];
        const values = snapshot.values || [];
        let snapshotHtml = '';
        if (periods.length > 0 && values.length > 0) {
            snapshotHtml = `
                <div class="notification-snapshot">
                    <div class="snapshot-title">关键数值快照</div>
                    <div class="snapshot-grid">
                        ${periods.map((p, i) => `
                            <div class="snapshot-item">
                                <span class="snapshot-period">${p}</span>
                                <span class="snapshot-value">${values[i]}</span>
                            </div>
                        `).join('')}
                    </div>
                    ${snapshot.metric_value !== undefined ? `
                        <div class="snapshot-metric">
                            当前值: <strong>${snapshot.metric_value}</strong>
                            ${snapshot.threshold !== undefined ? ` / 阈值: ${snapshot.threshold}` : ''}
                        </div>
                    ` : ''}
                </div>
            `;
        }
        return `
            <div class="notification-item ${n.is_read ? 'is-read' : 'is-unread'}" data-id="${n.id}">
                <div class="notification-item-header" onclick="toggleNotificationExpand(${n.id})">
                    <div class="notification-dot"></div>
                    <div class="notification-item-content">
                        <div class="notification-item-title">${n.title}</div>
                        <div class="notification-item-message">${n.message}</div>
                        <div class="notification-item-meta">
                            <span>${n.rule_name}</span>
                            <span>·</span>
                            <span>${n.created_at}</span>
                        </div>
                    </div>
                    ${!n.is_read ? `<button class="notification-mark-read" onclick="event.stopPropagation(); markNotificationRead(${n.id})">标记已读</button>` : ''}
                </div>
                <div class="notification-expand" id="notification-expand-${n.id}" style="display: none;">
                    ${snapshotHtml}
                </div>
            </div>
        `;
    }).join('');
}

function toggleNotificationExpand(id) {
    const el = document.getElementById(`notification-expand-${id}`);
    if (!el) return;
    const isVisible = el.style.display === 'block';
    el.style.display = isVisible ? 'none' : 'block';

    const item = document.querySelector(`.notification-item[data-id="${id}"]`);
    if (item && item.classList.contains('is-unread')) {
        markNotificationRead(id);
    }
}

async function markNotificationRead(id) {
    try {
        const res = await fetch(`/api/alert/notifications/${id}/read`, {method: 'POST'});
        if (res.ok) {
            const item = document.querySelector(`.notification-item[data-id="${id}"]`);
            if (item) {
                item.classList.remove('is-unread');
                item.classList.add('is-read');
                const btn = item.querySelector('.notification-mark-read');
                if (btn) btn.remove();
            }
            refreshNotificationBadge();
        }
    } catch (e) {
        console.error(e);
    }
}

async function markAllNotificationsRead() {
    try {
        const res = await fetch('/api/alert/notifications/read_all', {method: 'POST'});
        if (res.ok) {
            loadNotifications();
            refreshNotificationBadge();
            showToast('已全部标记为已读', 'success');
        }
    } catch (e) {
        console.error(e);
        showToast('操作失败', 'danger');
    }
}

async function runBackgroundAlertCheck() {
    try {
        await fetch('/api/alert/check', {method: 'POST'});
        refreshNotificationBadge();
    } catch (e) {
        console.error('Background check failed:', e);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('notificationBell')) {
        refreshNotificationBadge();
        setInterval(() => {
            refreshNotificationBadge();
            runBackgroundAlertCheck();
        }, 60000);
    }
});

// ============ Car Review System ============

let currentSelectedCar = null;
let currentRating = 0;

async function loadBarChart() {
    const params = getFilterParams();
    const res = await fetch(`/api/chart/bar${params}`);
    const data = await res.json();

    const brand = document.getElementById('brandFilter').value;

    const tbody = document.getElementById('dashboardTableBody');
    if (tbody) {
        tbody.innerHTML = data.models.map((m, i) => `
            <tr onclick="openCarSidebar(${data.model_ids[i]}, '${m}', '${data.brands[i]}', ${data.range[i]}, ${data.price[i]}, ${data.power[i]})" style="cursor: pointer;">
                <td style="color: #fff; font-weight: 500;">${m}</td>
                <td>${data.range[i]} km</td>
                <td>${data.price[i]} 万</td>
                <td>${data.power[i]}</td>
            </tr>
        `).join('');
    }

    charts.barChart.setOption({
        tooltip: { trigger: 'axis', backgroundColor: '#1e293b', borderColor: '#334155', textStyle: { color: '#fff' } },
        legend: { data: ['续航 (km)', '价格 (万元)', '百公里电耗'], textStyle: { color: '#94a3b8' }, top: 'bottom' },
        xAxis: { type: 'category', data: data.models, axisLabel: { color: '#94a3b8', interval: 0, rotate: 30 } },
        yAxis: { splitLine: { lineStyle: { color: '#334155' } } },
        grid: { bottom: '20%' },
        series: [
            { name: '续航 (km)', type: 'bar', data: data.range, itemStyle: { borderRadius: [4, 4, 0, 0] } },
            { name: '价格 (万元)', type: 'bar', data: data.price, itemStyle: { borderRadius: [4, 4, 0, 0] } },
            { name: '百公里电耗', type: 'bar', data: data.power, itemStyle: { borderRadius: [4, 4, 0, 0] } }
        ]
    });
}

function openCarSidebar(carId, modelName, brand, range, price, power) {
    currentSelectedCar = {
        id: carId,
        modelName: modelName,
        brand: brand,
        range: range,
        price: price,
        power: power
    };

    document.getElementById('carBasicInfo').innerHTML = `
        <h3 class="sidebar-car-title">${brand} ${modelName}</h3>
        <div class="sidebar-car-specs">
            <div class="spec-item">
                <span class="spec-label">续航</span>
                <span class="spec-value">${range} km</span>
            </div>
            <div class="spec-item">
                <span class="spec-label">价格</span>
                <span class="spec-value">${price} 万</span>
            </div>
            <div class="spec-item">
                <span class="spec-label">电耗</span>
                <span class="spec-value">${power} kWh</span>
            </div>
        </div>
    `;

    document.getElementById('carDetailSidebar').classList.add('open');
    document.body.style.overflow = 'hidden';

    loadRatingSummary(carId);
    loadMyReview(carId);
    resetReviewForm();
}

function closeCarSidebar() {
    document.getElementById('carDetailSidebar').classList.remove('open');
    document.body.style.overflow = '';
    currentSelectedCar = null;
}

async function loadRatingSummary(carId) {
    const summaryEl = document.getElementById('ratingSummary');
    summaryEl.innerHTML = '<div class="rating-summary-loading">加载中...</div>';

    try {
        const res = await fetch(`/api/reviews/summary/${carId}`);
        const data = await res.json();

        const starsHtml = renderStars(data.avg_rating);
        summaryEl.innerHTML = `
            <div class="rating-score">${data.avg_rating > 0 ? data.avg_rating.toFixed(1) : '--'}</div>
            <div class="rating-stars-display">${starsHtml}</div>
            <div class="rating-count">共 ${data.review_count} 条用户评价</div>
        `;
    } catch (e) {
        summaryEl.innerHTML = '<div class="rating-summary-error">加载失败</div>';
    }
}

function renderStars(rating) {
    let html = '';
    const fullStars = Math.floor(rating);
    const hasHalf = rating - fullStars >= 0.5;

    for (let i = 1; i <= 5; i++) {
        if (i <= fullStars) {
            html += '<span class="star-display star-full">★</span>';
        } else if (i === fullStars + 1 && hasHalf) {
            html += '<span class="star-display star-half">★</span>';
        } else {
            html += '<span class="star-display star-empty">★</span>';
        }
    }
    return html;
}

async function loadMyReview(carId) {
    const statusEl = document.getElementById('myReviewStatus');
    statusEl.innerHTML = '';

    try {
        const res = await fetch(`/api/reviews/my/${carId}`);
        const data = await res.json();

        if (data.review) {
            const review = data.review;
            let statusBadge = '';
            if (review.status === 'pending') {
                statusBadge = '<span class="review-status review-pending">待审核</span>';
            } else if (review.status === 'approved') {
                statusBadge = '<span class="review-status review-approved">已通过</span>';
            } else if (review.status === 'rejected') {
                statusBadge = '<span class="review-status review-rejected">已驳回</span>';
            }

            let adminNote = '';
            if (review.admin_note) {
                adminNote = `<div class="admin-note">处理意见：${review.admin_note}</div>`;
            }

            statusEl.innerHTML = `
                <div class="existing-review">
                    <div class="existing-review-header">
                        <span>您之前的评价</span>
                        ${statusBadge}
                    </div>
                    <div class="existing-review-rating">${renderStars(review.rating)}</div>
                    <div class="existing-review-comment">${review.comment}</div>
                    ${adminNote}
                    <div class="existing-review-time">提交时间：${review.updated_at}</div>
                    <div class="review-overwrite-hint">再次提交将覆盖当前评价</div>
                </div>
            `;

            setRating(review.rating);
            document.getElementById('reviewComment').value = review.comment;
            updateCharCount();
        }
    } catch (e) {
        console.error('Failed to load my review:', e);
    }
}

function resetReviewForm() {
    currentRating = 0;
    document.querySelectorAll('#starRating .star').forEach(s => {
        s.classList.remove('active', 'hover');
    });
    document.getElementById('reviewComment').value = '';
    updateCharCount();
}

function setupStarRating() {
    const stars = document.querySelectorAll('#starRating .star');
    
    stars.forEach((star, index) => {
        star.addEventListener('mouseover', () => {
            stars.forEach((s, i) => {
                if (i <= index) {
                    s.classList.add('hover');
                } else {
                    s.classList.remove('hover');
                }
            });
        });

        star.addEventListener('mouseout', () => {
            stars.forEach(s => s.classList.remove('hover'));
        });

        star.addEventListener('click', () => {
            const value = parseInt(star.dataset.value);
            setRating(value);
        });
    });

    const commentInput = document.getElementById('reviewComment');
    if (commentInput) {
        commentInput.addEventListener('input', updateCharCount);
    }
}

function setRating(value) {
    currentRating = value;
    const stars = document.querySelectorAll('#starRating .star');
    stars.forEach((s, i) => {
        if (i < value) {
            s.classList.add('active');
        } else {
            s.classList.remove('active');
        }
    });
}

function updateCharCount() {
    const comment = document.getElementById('reviewComment');
    const count = document.getElementById('charCount');
    if (comment && count) {
        count.textContent = comment.value.length;
    }
}

async function submitReview() {
    if (!currentSelectedCar) {
        showToast('请先选择车型', 'danger');
        return;
    }

    if (currentRating === 0) {
        showToast('请选择评分', 'danger');
        return;
    }

    const comment = document.getElementById('reviewComment').value.trim();
    if (!comment) {
        showToast('请填写评价内容', 'danger');
        return;
    }

    const btn = document.getElementById('submitReviewBtn');
    btn.disabled = true;
    btn.textContent = '提交中...';

    try {
        const res = await fetch('/api/reviews', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                car_model_id: currentSelectedCar.id,
                rating: currentRating,
                comment: comment
            })
        });

        const data = await res.json();

        if (res.ok) {
            showToast(data.message, 'success');
            loadRatingSummary(currentSelectedCar.id);
            loadMyReview(currentSelectedCar.id);
        } else {
            showToast(data.error || '提交失败', 'danger');
        }
    } catch (e) {
        showToast('提交失败，请重试', 'danger');
    } finally {
        btn.disabled = false;
        btn.textContent = '提交评价';
    }
}

window.addEventListener('load', () => {
    if (document.getElementById('starRating')) {
        setupStarRating();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const sidebar = document.getElementById('carDetailSidebar');
        if (sidebar && sidebar.classList.contains('open')) {
            closeCarSidebar();
        }
    }
});

