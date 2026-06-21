const CHART_THEME = {
    color: ['#38bdf8', '#818cf8', '#a78bfa', '#f472b6', '#fbbf24', '#f97316', '#10b981', '#ef4444'],
    backgroundColor: 'transparent',
    title: {
        textStyle: { color: '#94a3b8', fontSize: 14, fontWeight: 500 },
        subtextStyle: { color: '#64748b', fontSize: 12 }
    },
    legend: {
        textStyle: { color: '#94a3b8' }
    },
    tooltip: {
        backgroundColor: '#1e293b',
        borderColor: '#334155',
        borderWidth: 1,
        textStyle: { color: '#e2e8f0', fontSize: 13 }
    },
    categoryAxis: {
        axisLine: { lineStyle: { color: '#334155' } },
        axisTick: { lineStyle: { color: '#334155' } },
        axisLabel: { color: '#94a3b8' },
        splitLine: { lineStyle: { color: '#334155' } }
    },
    valueAxis: {
        axisLine: { lineStyle: { color: '#334155' } },
        axisTick: { lineStyle: { color: '#334155' } },
        axisLabel: { color: '#94a3b8' },
        splitLine: { lineStyle: { color: '#334155' } }
    }
};

const MAP_COLOR_SCHEMES = {
    cool: ['#1e293b', '#38bdf8', '#818cf8', '#a78bfa'],
    warm: ['#1e293b', '#fbbf24', '#f97316', '#ef4444']
};

const CHART_COLORS = {
    line: '#38bdf8',
    lineAreaStart: 'rgba(56, 189, 248, 0.4)',
    lineAreaEnd: 'rgba(56, 189, 248, 0)',
    scatter: '#f472b6',
    scatterShadow: 'rgba(244, 114, 182, 0.5)',
    mapEmphasis: '#a78bfa',
    pieBorder: '#1e293b'
};

const CHART_STYLE = {
    barBorderRadius: [4, 4, 0, 0],
    lineSymbol: 'circle',
    lineSymbolSize: 8,
    lineWidth: 4,
    pieInnerRadius: '40%',
    pieOuterRadius: '70%',
    pieBorderWidth: 2,
    scatterSymbolScale: 2
};

function getMapColors() {
    const scheme = (window.systemConfig && window.systemConfig.mapColorScheme) || 'cool';
    return MAP_COLOR_SCHEMES[scheme] || MAP_COLOR_SCHEMES.cool;
}

function registerChartTheme() {
    if (typeof echarts !== 'undefined') {
        echarts.registerTheme('nevquantum', CHART_THEME);
    }
}

registerChartTheme();
