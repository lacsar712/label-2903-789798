const ChartLoader = (function () {
    const charts = {};
    let mapGeoCache = null;

    const CHART_IDS = ['barChart', 'pieChart', 'lineChart', 'scatterChart', 'mapChart'];

    function initCharts() {
        CHART_IDS.forEach(function (id) {
            const el = document.getElementById(id);
            if (el) charts[id] = echarts.init(el, 'nevquantum');
        });
        bindChartEvents();
    }

    function bindChartEvents() {
        if (charts.barChart) {
            charts.barChart.on('click', function (params) {
                const brandSelect = document.getElementById('brandFilter');
                const brands = ['特斯拉', '比亚迪', '蔚来', '小鹏'];
                if (brands.includes(params.name)) {
                    brandSelect.value = params.name;
                    refreshCharts();
                }
            });
        }

        if (charts.pieChart) {
            charts.pieChart.on('click', function (params) {
                document.getElementById('brandFilter').value = params.name;
                refreshCharts();
                if (typeof showToast === 'function') {
                    showToast(t('toast_brand_filtered').replace('{name}', params.name), 'info');
                }
            });
        }
    }

    async function fetchChartData(url) {
        const res = await fetch(url);
        if (!res.ok) throw new Error('Fetch failed: ' + url);
        return res.json();
    }

    function getFilterParams() {
        const brand = document.getElementById('brandFilter').value;
        const city = document.getElementById('cityFilter').value;
        const pMin = document.getElementById('priceMin').value;
        const pMax = document.getElementById('priceMax').value;
        const rMin = document.getElementById('rangeMin').value;
        const sortField = document.getElementById('sortField').value;
        const sortOrder = document.getElementById('sortOrder').value;

        let url = '?brand=' + brand + '&city=' + city + '&price_min=' + pMin + '&price_max=' + pMax + '&range_min=' + rMin + '&sort_field=' + sortField + '&sort_order=' + sortOrder;
        document.querySelectorAll('.cat-filter:checked').forEach(function (cb) {
            url += '&category[]=' + cb.value;
        });
        return url;
    }

    function buildBarOption(data) {
        return {
            tooltip: { trigger: 'axis' },
            legend: { data: [t('chart_bar_legend_range'), t('chart_bar_legend_price'), t('chart_bar_legend_power')], top: 'bottom' },
            xAxis: { type: 'category', data: data.models, axisLabel: { interval: 0, rotate: 30 } },
            yAxis: {},
            grid: { bottom: '20%' },
            series: [
                { name: t('chart_bar_legend_range'), type: 'bar', data: data.range, itemStyle: { borderRadius: CHART_STYLE.barBorderRadius } },
                { name: t('chart_bar_legend_price'), type: 'bar', data: data.price, itemStyle: { borderRadius: CHART_STYLE.barBorderRadius } },
                { name: t('chart_bar_legend_power'), type: 'bar', data: data.power, itemStyle: { borderRadius: CHART_STYLE.barBorderRadius } }
            ]
        };
    }

    function buildLineOption(data, brand) {
        return {
            title: { text: brand ? (brand + ' ' + t('chart_line_title_brand')) : t('chart_line_title_total') },
            tooltip: { trigger: 'axis' },
            xAxis: { type: 'category', data: data.periods, boundaryGap: false },
            yAxis: {},
            series: [{
                name: t('chart_line_series_name'),
                data: data.sales,
                type: 'line',
                smooth: true,
                symbol: CHART_STYLE.lineSymbol,
                symbolSize: CHART_STYLE.lineSymbolSize,
                lineStyle: { width: CHART_STYLE.lineWidth, color: CHART_COLORS.line },
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: CHART_COLORS.lineAreaStart },
                        { offset: 1, color: CHART_COLORS.lineAreaEnd }
                    ])
                }
            }]
        };
    }

    function buildPieOption(data, city) {
        return {
            title: { text: city + ' ' + t('chart_pie_title'), left: 'center' },
            tooltip: { trigger: 'item' },
            series: [{
                type: 'pie',
                radius: [CHART_STYLE.pieInnerRadius, CHART_STYLE.pieOuterRadius],
                avoidLabelOverlap: false,
                itemStyle: { borderRadius: 10, borderColor: CHART_COLORS.pieBorder, borderWidth: CHART_STYLE.pieBorderWidth },
                label: { show: false },
                emphasis: { label: { show: true, fontSize: 16, fontWeight: 'bold', color: '#fff' } },
                data: data
            }]
        };
    }

    function buildScatterOption(data) {
        return {
            title: { text: t('chart_scatter_title') },
            tooltip: {
                formatter: function (params) {
                    return params.data[2] + '<br/>' + t('chart_scatter_tooltip_weight') + ': ' + params.data[0] + 'kg<br/>' + t('chart_scatter_tooltip_power') + ': ' + params.data[1] + 'kWh/100km';
                }
            },
            xAxis: { name: t('chart_scatter_xaxis') },
            yAxis: { name: t('chart_scatter_yaxis') },
            series: [{
                symbolSize: function (d) { return Math.sqrt(d[0]) / CHART_STYLE.scatterSymbolScale; },
                data: data.weight_power,
                type: 'scatter',
                itemStyle: { color: CHART_COLORS.scatter, shadowBlur: 10, shadowColor: CHART_COLORS.scatterShadow }
            }]
        };
    }

    function buildMapOption(data, mapMode) {
        var vals = data.data.map(function (d) { return d.value; }).filter(function (v) { return v > 0; });
        var maxVal = vals.length > 0 ? Math.max.apply(null, vals) : (mapMode === 'density' ? 50 : 20000);
        var mapColors = getMapColors();

        return {
            title: { text: data.title + ' (' + t('chart_map_zoomable') + ')' },
            visualMap: {
                min: 0, max: maxVal > 0 ? maxVal : 100, left: 'right', top: 'bottom',
                text: [t('chart_map_visual_high'), t('chart_map_visual_low')],
                calculable: true, inRange: { color: mapColors },
                textStyle: { color: '#94a3b8' }
            },
            tooltip: {
                trigger: 'item',
                formatter: function (params) {
                    var val = params.value ? params.value : 0;
                    var unit = mapMode === 'density' ? t('chart_map_tooltip_unit_density') : t('chart_map_tooltip_unit_sales');
                    return params.name + '<br/>' + (mapMode === 'density' ? t('chart_map_tooltip_density') : t('chart_map_tooltip_sales')) + ': ' + val + ' ' + unit;
                }
            },
            series: [{
                name: mapMode === 'density' ? t('chart_map_tooltip_density') : t('chart_map_tooltip_sales'),
                type: 'map', mapType: 'china', roam: true,
                emphasis: { label: { color: '#fff' }, itemStyle: { areaColor: CHART_COLORS.mapEmphasis } },
                data: data.data
            }]
        };
    }

    function renderChart(chartId, option, notMerge) {
        if (charts[chartId]) {
            charts[chartId].setOption(option, notMerge || false);
        }
    }

    async function loadBarChart() {
        var params = getFilterParams();
        var data = await fetchChartData('/api/chart/bar' + params);

        var tbody = document.getElementById('dashboardTableBody');
        if (tbody) {
            tbody.innerHTML = data.models.map(function (m, i) {
                return '<tr onclick="openCarSidebar(' + data.model_ids[i] + ', \'' + m + '\', \'' + data.brands[i] + '\', ' + data.range[i] + ', ' + data.price[i] + ', ' + data.power[i] + ')" style="cursor: pointer;">' +
                    '<td style="color: #fff; font-weight: 500;">' + m + '</td>' +
                    '<td>' + data.range[i] + ' km</td>' +
                    '<td>' + data.price[i] + ' ' + t('table_price_unit') + '</td>' +
                    '<td>' + data.power[i] + '</td>' +
                    '</tr>';
            }).join('');
        }

        renderChart('barChart', buildBarOption(data));
    }

    async function loadLineChart() {
        var brand = document.getElementById('brandFilter').value;
        var data = await fetchChartData('/api/chart/line?brand=' + brand);
        renderChart('lineChart', buildLineOption(data, brand), true);
    }

    async function loadPieChart() {
        var city = document.getElementById('cityFilter').value;
        var data = await fetchChartData('/api/chart/pie?city=' + city);
        renderChart('pieChart', buildPieOption(data, city));
    }

    async function loadScatterChart() {
        var params = getFilterParams();
        var data = await fetchChartData('/api/chart/scatter' + params);
        renderChart('scatterChart', buildScatterOption(data));
    }

    async function loadMapChart() {
        var mapMode = document.getElementById('mapMode').value;
        var params = getFilterParams();
        var data = await fetchChartData('/api/chart/map' + params + '&mode=' + mapMode);

        try {
            if (!mapGeoCache) {
                var mapRes = await fetch('https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json');
                mapGeoCache = await mapRes.json();
                echarts.registerMap('china', mapGeoCache);
            }
            renderChart('mapChart', buildMapOption(data, mapMode));
        } catch (e) {
            console.error('Map loading failed:', e);
            if (typeof showToast === 'function') {
                showToast(t('toast_map_load_failed'), 'danger');
            }
        }
    }

    function refreshCharts() {
        loadBarChart();
        loadLineChart();
        loadPieChart();
        loadScatterChart();
        loadMapChart();
    }

    function resizeAll() {
        Object.keys(charts).forEach(function (key) {
            charts[key].resize();
        });
    }

    function getChart(id) {
        return charts[id] || null;
    }

    function isInitialized() {
        return !!charts.barChart;
    }

    return {
        initCharts: initCharts,
        refreshCharts: refreshCharts,
        resizeAll: resizeAll,
        loadBarChart: loadBarChart,
        loadLineChart: loadLineChart,
        loadPieChart: loadPieChart,
        loadScatterChart: loadScatterChart,
        loadMapChart: loadMapChart,
        getFilterParams: getFilterParams,
        getChart: getChart,
        isInitialized: isInitialized,
        buildBarOption: buildBarOption,
        buildLineOption: buildLineOption,
        buildPieOption: buildPieOption,
        buildScatterOption: buildScatterOption,
        buildMapOption: buildMapOption,
        fetchChartData: fetchChartData,
        renderChart: renderChart
    };
})();
