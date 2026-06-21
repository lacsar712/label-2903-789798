// ============ i18n Multi-language Support ============
const I18N_TRANSLATIONS = {
    'zh-CN': {
        nav_dashboard: '数据大屏',
        nav_energy_ranking: '能耗排行',
        nav_alert_center: '异动订阅',
        nav_admin_data: '数据管理',
        nav_data_quality: '数据质量',
        nav_admin_users: '用户管理',
        nav_admin_reviews: '口碑审核',
        nav_quarterly_report: '季度报告',
        nav_admin_settings: '系统设置',
        nav_change_password: '修改密码',
        nav_logout: '安全退出',
        nav_login: '身份验证',
        nav_register: '新用户注册',

        alert_notifications: '异动通知',
        alert_mark_all_read: '全部已读',
        alert_manage_rules: '管理规则',
        alert_no_notifications: '暂无异动通知',
        alert_bell_title: '异动通知',

        modal_confirm_title: '确认操作',
        modal_cancel: '取消',
        modal_confirm: '确定',

        preset_manager_title: '筛选方案管理',
        preset_select_placeholder: '-- 选择已保存方案 --',
        preset_mine: '★ 我的方案',
        preset_public: '🌐 公共方案（团队共享）',
        preset_save_current: '保存当前方案',
        preset_apply: '应用方案',
        preset_rename: '重命名',
        preset_delete: '删除',
        preset_mark_public: '标记公共',
        preset_unmark_public: '取消公共',
        preset_refresh: '刷新',
        preset_info_label: '当前方案信息：',
        preset_tag_mine: '我的',
        preset_tag_public: '公共',
        preset_tag_owner: '创建者',
        preset_save_modal_title: '保存筛选方案',
        preset_name_label: '方案名称',
        preset_name_placeholder: '请输入方案名称',
        preset_save_hint: '将保存当前所有筛选条件和排序设置',
        preset_confirm_save: '确定保存',
        preset_rename_modal_title: '重命名方案',
        preset_new_name_label: '新名称',
        preset_new_name_placeholder: '请输入新名称',
        preset_confirm_rename: '确定',

        filter_brand: '品牌',
        filter_brand_all: '全部',
        filter_city: '城市',
        filter_price: '价格 (万元)',
        filter_price_min: '最小',
        filter_price_max: '最大',
        filter_range: '续航 (km)',
        filter_range_min: '最小',
        filter_category: '动力类型',
        filter_cat_ev: '纯电',
        filter_cat_hybrid: '混动',
        filter_sort: '表格排序',
        filter_sort_model: '车型名称',
        filter_sort_range: '续航里程',
        filter_sort_price: '价格',
        filter_sort_power: '电耗',
        filter_sort_sales: '销量',
        filter_sort_asc: '升序',
        filter_sort_desc: '降序',
        filter_map_mode: '地图维度',
        filter_map_sales: '销量热力分布',
        filter_map_density: '充电桩密度',
        filter_load_data: '加载数据',
        filter_reset_data: '重置模拟数据',

        chart_bar_title: '车型参数多维对比',
        chart_bar_legend_range: '续航 (km)',
        chart_bar_legend_price: '价格 (万元)',
        chart_bar_legend_power: '百公里电耗',
        chart_pie_title: '区域品牌份额分布',
        chart_line_title_total: '全行业销量趋势',
        chart_line_title_brand: '销量趋势',
        chart_line_series_name: '销量',
        chart_scatter_title: '价格与续航相关性分析',
        chart_scatter_tooltip_weight: '重量',
        chart_scatter_tooltip_power: '电耗',
        chart_scatter_xaxis: '重量 (kg)',
        chart_scatter_yaxis: '电耗 (kWh)',
        chart_map_title_sales: '全国销售热力分布',
        chart_map_title_density: '各省份充电桩密度分布',
        chart_map_brand_sales: '全国销量分布',
        chart_map_zoomable: '可滚轮缩放',
        chart_map_visual_high: '高',
        chart_map_visual_low: '低',
        chart_map_tooltip_sales: '销量',
        chart_map_tooltip_density: '密度',
        chart_map_tooltip_unit_sales: '辆',
        chart_map_tooltip_unit_density: '个/km²',

        table_model: '车型',
        table_range: '续航',
        table_price: '价格',
        table_power: '电耗',

        car_sidebar_rating_loading: '加载中...',
        car_sidebar_rating_error: '加载失败',
        car_sidebar_review_count: '条用户评价',
        car_sidebar_spec_range: '续航',
        car_sidebar_spec_price: '价格',
        car_sidebar_spec_power: '电耗',
        car_sidebar_my_review_title: '我的评价',
        car_sidebar_review_placeholder: '请输入您的评价内容（选填）',
        car_sidebar_review_submit: '提交评价',
        car_sidebar_review_submitting: '提交中...',
        car_sidebar_review_existing: '您之前的评价',
        car_sidebar_status_pending: '待审核',
        car_sidebar_status_approved: '已通过',
        car_sidebar_status_rejected: '已驳回',
        car_sidebar_admin_note: '处理意见',
        car_sidebar_review_time: '提交时间',
        car_sidebar_overwrite_hint: '再次提交将覆盖当前评价',

        ranking_title: '能耗排行榜',
        ranking_subtitle: '全部车型百公里电耗排名 · 点击车型跳转至回看板',
        ranking_stat_total: '上榜车型',
        ranking_stat_avg: '平均电耗',
        ranking_stat_best: '最优电耗',
        ranking_tab_all: '全部车型',
        ranking_tab_ev: '纯电',
        ranking_tab_hybrid: '混动',
        ranking_sort_hint: '主排序：电耗从低到高 · 点击「车重」列切换次要排序',
        ranking_col_rank: '排名',
        ranking_col_model: '车型',
        ranking_col_brand: '品牌',
        ranking_col_type: '类型',
        ranking_col_consumption: '百公里电耗',
        ranking_col_weight: '车重',
        ranking_col_range: '续航',
        ranking_col_price: '价格',
        ranking_col_action: '操作',
        ranking_review_btn: '回看板',
        ranking_empty: '暂无符合条件的车型数据',

        alert_center_title: '市场异动订阅中心',
        alert_center_subtitle: '设定监测规则，系统自动追踪行业脉搏，异常即时推送',
        alert_check_now: '立即检测',
        alert_add_rule: '新建规则',
        alert_stat_total: '全部规则',
        alert_stat_active: '运行中',
        alert_stat_unread: '未读异动',
        alert_my_rules: '我的监测规则',
        alert_empty_state: '暂无监测规则',
        alert_empty_hint: '点击右上角「新建规则」开始订阅市场异动',

        rule_modal_title_new: '新建监测规则',
        rule_modal_title_edit: '编辑监测规则',
        rule_name_label: '规则名称',
        rule_name_placeholder: '例如：特斯拉季度销量异动监测',
        rule_type_label: '规则类型',
        rule_type_sales: '销量异动',
        rule_type_pile: '充电桩密度异动',
        rule_dimension_label: '监测维度',
        rule_dim_brand: '品牌维度',
        rule_dim_region: '区域维度',
        rule_dim_brand_region: '品牌+区域',
        rule_dim_province: '省份维度',
        rule_target_brand_label: '选择品牌',
        rule_target_brand_placeholder: '-- 请选择品牌 --',
        rule_target_brand_all: '全部品牌',
        rule_target_region_label: '选择省份',
        rule_target_region_placeholder: '-- 请选择省份 --',
        rule_target_region2_label: '省份',
        rule_target_brand2_label: '品牌（可选）',
        rule_metric_label: '监测指标',
        rule_condition_label: '判定条件',
        rule_threshold_label: '阈值',
        rule_threshold_placeholder: '请输入阈值',
        rule_consecutive_label: '连续期数',
        rule_consecutive_placeholder: '连续多少期',
        rule_preview_label: '规则预览',
        rule_preview_placeholder: '请填写规则参数...',
        rule_save_btn: '保存规则',
        rule_update_btn: '更新规则',
        rule_btn_cancel: '取消',

        metric_sales_quantity: '销量绝对值',
        metric_sales_change_rate: '环比变化率 (%)',
        metric_pile_density: '密度绝对值',
        metric_pile_consecutive_decline: '连续下滑期数',

        cond_gt: '大于 (>)',
        cond_gte: '大于等于 (≥)',
        cond_lt: '小于 (<)',
        cond_lte: '小于等于 (≤)',
        cond_eq: '等于 (=)',

        preview_metric_quantity: '销量',
        preview_metric_change_rate: '销量环比变化率',
        preview_metric_density: '充电桩密度',
        preview_metric_consecutive_decline: '密度连续下滑期数',
        preview_cond_gt: '大于',
        preview_cond_gte: '大于等于',
        preview_cond_lt: '小于',
        preview_cond_lte: '小于等于',
        preview_cond_eq: '等于',
        preview_when: '当',
        preview_target: '目标',
        preview_trigger: '时触发告警',
        preview_periods_consecutive: '连续',
        preview_periods_declines: '期下滑时触发告警',

        rule_type_label_sales: '销量异动',
        rule_type_label_pile: '充电桩异动',
        rule_desc_created: '创建于',
        rule_desc_last_checked: '最近检测',
        rule_enabled: '规则已启用',
        rule_disabled: '规则已暂停',
        rule_deleted: '规则已删除',
        rule_updated: '规则已更新',
        rule_created: '规则创建成功',
        rule_delete_confirm: '确定要删除此监测规则吗？此操作不可恢复。',

        alert_checking: '正在检测所有规则...',
        alert_check_triggered: '检测完成：发现 N 条异动！',
        alert_check_clean: '检测完成：未发现异常（共检测 N 条规则）',
        alert_check_failed: '检测失败',

        toast_save_success: '方案保存成功',
        toast_save_updated: '方案已更新',
        toast_rename_success: '方案已重命名',
        toast_delete_success: '方案已删除',
        toast_apply_success: '已应用方案',
        toast_mark_public: '方案已标记为公共',
        toast_unmark_public: '方案已取消公共',
        toast_preset_name_empty: '请输入方案名称',
        toast_preset_duplicate: '您已存在同名方案',
        toast_preset_invalid: '筛选参数无效',
        toast_preset_load_failed: '加载方案列表失败',
        toast_preset_select_first: '请先选择一个方案',
        toast_preset_no_permission_edit: '无权限修改此方案',
        toast_preset_no_permission_delete: '无权限删除此方案',
        toast_preset_no_permission_public: '无权限操作',
        toast_preset_delete_confirm_prefix: '确定要删除方案「',
        toast_preset_delete_confirm_suffix: '」吗？此操作不可恢复。',
        toast_preset_unmark_confirm_prefix: '确定要取消方案「',
        toast_preset_unmark_confirm_suffix: '」的公共标记吗？其他用户将无法再使用此方案。',
        toast_preset_mark_confirm_prefix: '确定要将方案「',
        toast_preset_mark_confirm_suffix: '」标记为公共方案吗？所有用户都可以查看和使用此方案。',
        toast_preset_cancel_public: '取消公共标记',
        toast_preset_mark_as_public: '标记为公共方案',

        toast_map_load_failed: '地图加载失败，请检查网络',
        toast_brand_filtered_prefix: '已筛选品牌: ',
        toast_position_brand_prefix: '已定位至品牌: ',
        toast_position_model_prefix: '已定位至车型: ',
        toast_model_not_found_prefix: '车型 ',
        toast_model_not_found_suffix: ' 不在当前筛选结果中',

        toast_select_car_first: '请先选择车型',
        toast_select_rating: '请选择评分',
        toast_fill_review: '请填写评价内容',
        toast_review_submitting: '提交中...',
        toast_review_failed: '提交失败，请重试',

        toast_rule_name_empty: '请输入规则名称',
        toast_rule_target_empty: '请选择监测目标',
        toast_rule_threshold_empty: '请输入阈值',
        toast_rule_save_failed: '保存失败，请重试',
        toast_rule_select_first: '请先选择一个方案',
        toast_rule_no_permission: '无权限操作',
        toast_operation_failed: '操作失败',
        toast_all_read: '已全部标记为已读',
        toast_mark_read_failed: '操作失败',
        toast_load_failed: '加载失败',
        toast_notification_loading: '加载中...',
        toast_initialized: '数据初始化成功',
        toast_db_init_title: '重置数据库',
        toast_db_init_confirm: '确定要删除现有记录并初始化模拟数据吗？',

        lang_zh: '中文',
        lang_en: 'English',
        lang_switch_tooltip: '切换语言',

        tour_step_title_filter: '筛选面板',
        tour_step_desc_filter: '在这里您可以按品牌、城市、价格、续航等多维度筛选数据。调整筛选条件后，所有图表会自动更新。',
        tour_step_title_bar: '多维柱状图',
        tour_step_desc_bar: '展示各车型的续航、价格、电耗等参数对比。点击柱状图中的品牌，可以快速筛选查看特定品牌的数据。',
        tour_step_title_map: '地图维度切换',
        tour_step_desc_map: '在「销量热力分布」和「充电桩密度」两种视图间切换，从不同角度洞察市场数据。',
        tour_step_title_pie: '区域饼图',
        tour_step_desc_pie: '展示当前所选城市的各品牌市场份额。点击饼图中的品牌区块，可快速筛选该品牌数据。',
        tour_step_num: '第',
        tour_step_total: '步 / 共',
        tour_step_suffix: '步',
        tour_skip: '跳过引导',
        tour_continue: '继续',
        tour_complete: '完成',

        login_title: '系统登录',
        login_username: '用户名',
        login_username_placeholder: '请输入用户名',
        login_password: '密码',
        login_password_placeholder: '请输入密码',
        login_submit: '立即进入',
        login_no_account: '还没有账号？',
        login_create_account: '创建新账号',

        register_title: '新用户注册',
        register_username: '用户名',
        register_username_placeholder: '建议使用中/英文',
        register_password: '密码',
        register_password_placeholder: '最少6位字符',
        register_submit: '完成注册',
        register_has_account: '已有账号？',
        register_login_now: '立即登录',

        chpwd_title: '安全修改密码',
        chpwd_old_password: '当前密码',
        chpwd_new_password: '新密码',
        chpwd_submit: '更新访问凭证',
        chpwd_tour_title: '新手引导',
        chpwd_tour_desc: '重温看板功能导引，快速熟悉核心操作。',
        chpwd_tour_restart: '重温引导',

        settings_title: '系统外观设置',
        settings_site_title_label: '站点标题文案',
        settings_site_title_placeholder: '请输入站点标题',
        settings_site_title_hint: '显示在浏览器标签页和导航栏中，保存后用户刷新页面即可看到变化',
        settings_default_city_label: '新用户默认城市',
        settings_default_city_hint: '仅作用于尚未设定个人偏好或未通过链接指定城市的新访客',
        settings_map_scheme_label: '地图热力配色方案',
        settings_scheme_cool: '冷色调',
        settings_scheme_warm: '暖色调',
        settings_map_scheme_hint: '选择地图热力图的配色风格，保存后用户刷新页面即可看到变化',
        settings_self_register_label: '开放自助注册',
        settings_self_register_hint: '开启后访客可自行注册账号；关闭后仅管理员可创建用户',
        settings_save_btn: '保存设置',
        settings_saving: '保存中...',
        settings_save_success: '设置保存成功！刷新页面即可看到效果',
        settings_save_failed: '保存失败',
        settings_load_failed: '加载设置失败',

        admindata_title: '车型数据管理',
        admindata_add_btn: '新增车型',
        admindata_col_brand: '品牌',
        admindata_col_model: '型号',
        admindata_col_price: '价格 (万)',
        admindata_col_range: '续航 (km)',
        admindata_col_power: '电耗',
        admindata_col_weight: '重量 (kg)',
        admindata_col_type: '类型',
        admindata_col_action: '操作',
        admindata_modal_edit_title: '编辑车型资料',
        admindata_modal_add_title: '新增车型资料',
        admindata_label_brand: '品牌',
        admindata_label_model: '型号',
        admindata_label_price: '价格 (万)',
        admindata_label_range: '续航 (km)',
        admindata_label_power: '电耗 (kWh)',
        admindata_label_weight: '重量 (kg)',
        admindata_label_category: '动力类型',
        admindata_cat_ev: '纯电',
        admindata_cat_hybrid: '混动',
        admindata_btn_cancel: '取消',
        admindata_btn_save: '提交保存',
        admindata_btn_edit: '编辑',
        admindata_btn_delete: '删除',
        admindata_save_success: '保存成功',
        admindata_save_failed: '保存失败',
        admindata_delete_success: '已删除',
        admindata_delete_failed: '删除失败',
        admindata_delete_confirm_title: '确认删除',
        admindata_delete_confirm_msg: '确定要删除这条车型记录吗？',

        adminusers_title: '系统用户管理',
        adminusers_add_btn: '新增用户',
        adminusers_col_username: '用户名',
        adminusers_col_role: '角色',
        adminusers_col_action: '操作',
        adminusers_modal_edit_title: '编辑用户信息',
        adminusers_modal_add_title: '新增系统用户',
        adminusers_label_username: '用户名',
        adminusers_label_password: '密码 (留空表示不修改)',
        adminusers_label_role: '角色',
        adminusers_role_user: '普通用户',
        adminusers_role_admin: '管理员',
        adminusers_btn_cancel: '取消',
        adminusers_btn_save: '提交保存',
        adminusers_btn_edit: '编辑',
        adminusers_btn_delete: '删除',
        adminusers_save_success: '保存成功',
        adminusers_save_failed: '保存失败',
        adminusers_delete_success: '已删除',
        adminusers_delete_failed: '删除失败',
        adminusers_delete_confirm_title: '确认删除',
        adminusers_delete_confirm_msg: '确定要删除该用户吗？',
        adminusers_password_required: '新用户必须设置密码',

        adminreviews_title: '口碑审核管理',
        adminreviews_subtitle: '审核用户提交的车型评价，通过或驳回并附处理意见',
        adminreviews_stat_pending: '待审核',
        adminreviews_stat_approved: '已通过',
        adminreviews_stat_rejected: '已驳回',
        adminreviews_tab_pending: '待审核',
        adminreviews_tab_approved: '已通过',
        adminreviews_tab_rejected: '已驳回',
        adminreviews_loading: '加载中...',
        adminreviews_empty_prefix: '暂无',
        adminreviews_empty_suffix: '的评价',
        adminreviews_load_failed: '加载失败，请重试',
        adminreviews_modal_title: '审核评价',
        adminreviews_admin_note_label: '处理意见',
        adminreviews_admin_note_placeholder: '请输入处理意见（驳回时必填）',
        adminreviews_btn_cancel: '取消',
        adminreviews_btn_reject: '驳回',
        adminreviews_btn_approve: '通过',
        adminreviews_modal_label_user: '用户：',
        adminreviews_modal_label_car: '车型：',
        adminreviews_modal_label_rating: '评分：',
        adminreviews_modal_label_comment: '评价：',
        adminreviews_note_required: '驳回时请填写处理意见',
        adminreviews_operation_failed: '操作失败',
        adminreviews_retry_hint: '操作失败，请重试',
        adminreviews_status_approved: '已通过',
        adminreviews_status_rejected: '已驳回',
        adminreviews_reviewer_label: '审核人：',
        adminreviews_reviewed_at_label: '',

        dq_title: '数据质量健康巡检台',
        dq_subtitle: '自动扫描并归类四类数据隐患，一键修复或快速定位编辑',
        dq_scan_time_prefix: '扫描时间: ',
        dq_btn_scan: '立即扫描',
        dq_scanning: '正在扫描数据...',
        dq_scan_failed: '扫描失败',
        dq_scan_success_prefix: '扫描完成，共发现 ',
        dq_scan_success_suffix: ' 项问题',
        dq_stat_total: '问题总数',
        dq_stat_orphan: '孤立无销量车型',
        dq_stat_abnormal: '销量异常记录',
        dq_stat_piles: '充电桩空缺省份',
        dq_stat_duplicate: '重复品牌车型',
        dq_issue_orphan_title: '孤立无销量挂靠车型',
        dq_issue_abnormal_title: '销量异常记录',
        dq_issue_piles_title: '充电桩密度空缺省份',
        dq_issue_dup_title: '重复品牌车型组合',
        dq_tag_auto_fix: '可自动修复',
        dq_tag_manual: '需人工介入',
        dq_orphan_desc: '存在车型记录但无任何销量数据挂靠，可能导致图表统计不完整',
        dq_abnormal_desc: '销量≤0或远超均值3倍标准差的异常数据记录',
        dq_piles_desc: '最新统计周期内缺少充电桩密度数据的省份，会导致地图出现空白',
        dq_dup_desc: '存在相同品牌+车型名的多条记录，请人工判定保留哪条或合并数据',
        dq_btn_gen_sales: '批量生成模拟销量',
        dq_btn_delete: '批量删除',
        dq_btn_fix_normalize: '批量修正为均值',
        dq_btn_fix_piles: '批量补全数据',
        dq_btn_goto_data: '前往数据管理',
        dq_select_all: '全选',
        dq_col_brand: '品牌',
        dq_col_model: '车型',
        dq_col_price: '价格(万)',
        dq_col_range: '续航(km)',
        dq_col_type: '类型',
        dq_col_region: '地区',
        dq_col_period: '季度',
        dq_col_sales: '销量',
        dq_col_reason: '异常原因',
        dq_col_province: '省份',
        dq_col_data_period: '数据周期',
        dq_col_brand_model: '品牌/车型',
        dq_col_dup_count: '重复数',
        dq_col_instances: '实例详情',
        dq_col_action: '操作',
        dq_empty: '暂无问题',
        dq_empty_orphan: '暂无问题，全部车型均有销量数据',
        dq_empty_abnormal: '暂无问题，销量数据正常',
        dq_empty_piles: '暂无问题，所有省份均有充电桩数据',
        dq_empty_dup: '暂无问题，品牌车型组合唯一',
        dq_btn_edit: '编辑',
        dq_dup_count_suffix: ' 条',
        dq_select_car_first: '请先选择要处理的车型',
        dq_select_record_first: '请先选择要处理的记录',
        dq_select_province_first: '请先选择要补全的省份',
        dq_action_gen_sales: '生成模拟销量',
        dq_action_delete_car: '删除车型',
        dq_action_normalize: '修正为均值',
        dq_action_delete_record: '删除记录',
        dq_confirm_title: '确认操作',
        dq_confirm_orphan_prefix: '确定要对选中的 ',
        dq_confirm_orphan_suffix: ' 个孤立车型执行「',
        dq_confirm_abnormal_prefix: '确定要对选中的 ',
        dq_confirm_abnormal_suffix: ' 条异常销量记录执行「',
        dq_confirm_piles_prefix: '确定要为选中的 ',
        dq_confirm_piles_suffix: ' 个省份补全充电桩密度数据吗？',
        dq_fix_success_prefix: '已成功处理 ',
        dq_fix_success_suffix: ' 条记录',
        dq_fix_piles_success_prefix: '已成功补全 ',
        dq_fix_piles_success_suffix: ' 个省份的数据',
        dq_fix_failed: '处理失败',

        report_title: '季度复盘报告',
        report_subtitle: '管理员专用 · 一键生成结构化季度复盘文档 · 支持打印导出',
        report_btn_print: '打印 / 导出PDF',
        report_btn_regenerate: '重新生成',
        report_label_period: '目标季度 *',
        report_period_placeholder: '-- 请选择季度 --',
        report_label_brands: '品牌范围（可选，留空为全部品牌）',
        report_btn_generate: '生成报告',
        report_btn_generating: '生成中...',
        report_empty_title: '暂无报告内容',
        report_empty_hint: '请选择目标季度并点击「生成报告」按钮',
        report_main_title_prefix: '',
        report_main_title_suffix: ' 新能源汽车季度复盘报告',
        report_scope_label: '报告范围',
        report_scope_all: '全部品牌',
        report_gen_time_label: '生成时间',
        report_gen_user_label: '编制人',
        report_confidential: '机密文件 · 仅供内部使用',
        report_section1_title: '销量总览',
        report_section1_subtitle: 'Sales Overview · 季度核心指标一览',
        report_chart_bar_title: '品牌销量对比 TOP5',
        report_section2_title: '品牌前五榜单',
        report_section2_subtitle: 'Top 5 Brands · 销量排行与市场份额',
        report_col_rank: '排名',
        report_col_brand: '品牌',
        report_col_quarter_sales: '季度销量',
        report_col_market_share: '市场份额',
        report_col_qoq_change: '环比变化',
        report_col_models: '在售车型',
        report_col_top_model: '热销车型',
        report_sub_top_models: '车型销量 TOP5',
        report_unit_sales: '辆',
        report_models_count_suffix: ' 款',
        report_section3_title: '各省热力缩略',
        report_section3_subtitle: 'Regional Heatmap · 全国销量分布概览',
        report_map_title: '全国销量热力分布',
        report_sub_top_provinces: 'TOP 5 省份',
        report_section4_title: '电耗表现优异车型',
        report_section4_subtitle: 'Energy Efficiency · 百公里电耗低于行业均值',
        report_es_models: '上榜车型',
        report_es_models_suffix: '款',
        report_es_avg_score: '平均效率评分',
        report_es_avg_score_suffix: '分',
        report_es_best_power: '最优电耗',
        report_es_best_power_suffix: 'kWh/100km',
        report_es_avg_power: '行业均值',
        report_es_avg_power_suffix: 'kWh/100km',
        report_es_total_sales: '合计季度销量',
        report_es_total_sales_suffix: '辆',
        report_col_eff_category: '类型',
        report_col_eff_power: '百公里电耗',
        report_col_eff_score: '效率评分',
        report_col_eff_range: '续航里程',
        report_col_eff_sales: '季度销量',
        report_col_eff_score_suffix: '分',
        report_col_eff_range_suffix: ' km',
        report_eff_power_suffix: ' kWh',
        report_section5_title: '报告结语',
        report_section5_subtitle: 'Report Summary · 核心洞察提炼',
        report_sig_user_label: '报告编制',
        report_sig_date_label: '签发日期',
        report_period_required: '请选择目标季度',
        report_generate_failed: '报告生成失败',
        report_generate_success: '报告生成成功！',
        report_meta_load_failed: '加载元数据失败',
        report_ov_total_sales: '季度总销量',
        report_ov_total_sales_prev: '上季 ',
        report_ov_total_sales_prev_suffix: ' 辆',
        report_ov_qoq: '环比变化',
        report_ov_qoq_prev_period: '较 ',
        report_ov_brands: '覆盖品牌',
        report_ov_brands_suffix: '个',
        report_ov_brands_models_suffix: ' 款车型',
        report_ov_regions: '覆盖区域',
        report_ov_regions_suffix: '省/市',
        report_ov_regions_sub: '全国省份统计',
        report_unit_suffix: '辆',
        report_prev_period_prefix: '',
        report_summary_title_market: '市场规模',
        report_summary_title_brand: '品牌格局',
        report_summary_title_region: '区域热力',
        report_summary_title_efficiency: '效率标杆',
        report_summary_up: '增长',
        report_summary_down: '下滑',
        report_summary_rank23_prefix: '第 2-3 名分别为 ',
        report_summary_rank23_mid: ' 与 ',
        report_summary_rank23_suffix: '。',

        sec_alert_title: '安全提醒',
        sec_alert_desc_prefix: '检测到您的账号从一个陌生地址登录，请确认是否为您本人操作。登录IP：',
        sec_alert_desc_suffix: '，登录时间：',
        sec_alert_confirm: '确认是本人操作',

        settings_personal_title: '个人设置',
        settings_personal_subtitle: '管理您的账号安全和登录信息',

        login_history_title: '登录足迹',
        login_history_subtitle: '最近 20 次登录记录',
        login_history_col_time: '登录时间',
        login_history_col_ip: 'IP地址',
        login_history_col_device: '设备/浏览器',
        login_history_col_status: '状态',
        login_history_loading: '加载中...',
        login_history_empty: '暂无登录记录',
        login_history_load_failed: '加载失败',
        login_history_status_active: '会话活跃',
        login_history_status_ended: '会话已结束',
        login_history_status_new: '陌生地址',

        adminusers_btn_view_logs: '登录轨迹',
        admin_login_logs_title: '用户登录轨迹',
        admin_login_logs_col_action: '操作',
        admin_login_logs_btn_terminate: '强制终止',
        admin_login_logs_ended: '已结束',
        admin_terminate_confirm_title: '确认终止会话',
        admin_terminate_confirm_msg: '确定要强制终止该用户的登录会话吗？此操作将立即失效该会话。',
        admin_terminate_success: '会话已强制终止',
        admin_terminate_failed: '操作失败'
    },
    'en-US': {
        nav_dashboard: 'Dashboard',
        nav_energy_ranking: 'Energy Ranking',
        nav_alert_center: 'Alert Center',
        nav_admin_data: 'Data Management',
        nav_data_quality: 'Data Quality',
        nav_admin_users: 'User Management',
        nav_admin_reviews: 'Review Moderation',
        nav_quarterly_report: 'Quarterly Report',
        nav_admin_settings: 'System Settings',
        nav_change_password: 'Change Password',
        nav_logout: 'Sign Out',
        nav_login: 'Sign In',
        nav_register: 'Register',

        alert_notifications: 'Alerts',
        alert_mark_all_read: 'Mark All Read',
        alert_manage_rules: 'Manage Rules',
        alert_no_notifications: 'No alerts',
        alert_bell_title: 'Alerts',

        modal_confirm_title: 'Confirm Action',
        modal_cancel: 'Cancel',
        modal_confirm: 'Confirm',

        preset_manager_title: 'Filter Preset Manager',
        preset_select_placeholder: '-- Select a preset --',
        preset_mine: '★ My Presets',
        preset_public: '🌐 Public Presets (Shared)',
        preset_save_current: 'Save Current',
        preset_apply: 'Apply',
        preset_rename: 'Rename',
        preset_delete: 'Delete',
        preset_mark_public: 'Make Public',
        preset_unmark_public: 'Make Private',
        preset_refresh: 'Refresh',
        preset_info_label: 'Current Preset:',
        preset_tag_mine: 'Mine',
        preset_tag_public: 'Public',
        preset_tag_owner: 'Owner',
        preset_save_modal_title: 'Save Filter Preset',
        preset_name_label: 'Preset Name',
        preset_name_placeholder: 'Enter preset name',
        preset_save_hint: 'All current filters and sorting settings will be saved',
        preset_confirm_save: 'Save',
        preset_rename_modal_title: 'Rename Preset',
        preset_new_name_label: 'New Name',
        preset_new_name_placeholder: 'Enter new name',
        preset_confirm_rename: 'Confirm',

        filter_brand: 'Brand',
        filter_brand_all: 'All',
        filter_city: 'City',
        filter_price: 'Price (10k CNY)',
        filter_price_min: 'Min',
        filter_price_max: 'Max',
        filter_range: 'Range (km)',
        filter_range_min: 'Min',
        filter_category: 'Powertrain',
        filter_cat_ev: 'BEV',
        filter_cat_hybrid: 'PHEV',
        filter_sort: 'Table Sort',
        filter_sort_model: 'Model Name',
        filter_sort_range: 'Range',
        filter_sort_price: 'Price',
        filter_sort_power: 'Power Cons.',
        filter_sort_sales: 'Sales',
        filter_sort_asc: 'Ascending',
        filter_sort_desc: 'Descending',
        filter_map_mode: 'Map View',
        filter_map_sales: 'Sales Heatmap',
        filter_map_density: 'Charging Density',
        filter_load_data: 'Load Data',
        filter_reset_data: 'Reset Mock Data',

        chart_bar_title: 'Multi-dimensional Model Comparison',
        chart_bar_legend_range: 'Range (km)',
        chart_bar_legend_price: 'Price (10k CNY)',
        chart_bar_legend_power: 'Power/100km',
        chart_pie_title: 'Regional Brand Share',
        chart_line_title_total: 'Industry Sales Trend',
        chart_line_title_brand: 'Sales Trend',
        chart_line_series_name: 'Sales',
        chart_scatter_title: 'Price vs Range Correlation',
        chart_scatter_tooltip_weight: 'Weight',
        chart_scatter_tooltip_power: 'Power Cons.',
        chart_scatter_xaxis: 'Weight (kg)',
        chart_scatter_yaxis: 'Power (kWh)',
        chart_map_title_sales: 'National Sales Heatmap',
        chart_map_title_density: 'Provincial Charging Density',
        chart_map_brand_sales: 'National Sales Distribution',
        chart_map_zoomable: '(scroll to zoom)',
        chart_map_visual_high: 'High',
        chart_map_visual_low: 'Low',
        chart_map_tooltip_sales: 'Sales',
        chart_map_tooltip_density: 'Density',
        chart_map_tooltip_unit_sales: 'units',
        chart_map_tooltip_unit_density: '/km²',

        table_model: 'Model',
        table_range: 'Range',
        table_price: 'Price',
        table_power: 'Power',

        car_sidebar_rating_loading: 'Loading...',
        car_sidebar_rating_error: 'Load failed',
        car_sidebar_review_count: 'user reviews',
        car_sidebar_spec_range: 'Range',
        car_sidebar_spec_price: 'Price',
        car_sidebar_spec_power: 'Power',
        car_sidebar_my_review_title: 'My Review',
        car_sidebar_review_placeholder: 'Enter your review (optional)',
        car_sidebar_review_submit: 'Submit Review',
        car_sidebar_review_submitting: 'Submitting...',
        car_sidebar_review_existing: 'Your previous review',
        car_sidebar_status_pending: 'Pending',
        car_sidebar_status_approved: 'Approved',
        car_sidebar_status_rejected: 'Rejected',
        car_sidebar_admin_note: 'Admin Note',
        car_sidebar_review_time: 'Submitted',
        car_sidebar_overwrite_hint: 'Submitting again will overwrite current review',

        ranking_title: 'Energy Efficiency Ranking',
        ranking_subtitle: 'All models ranked by power consumption · Click a model to jump to dashboard',
        ranking_stat_total: 'Models',
        ranking_stat_avg: 'Avg Cons.',
        ranking_stat_best: 'Best Cons.',
        ranking_tab_all: 'All Models',
        ranking_tab_ev: 'BEV',
        ranking_tab_hybrid: 'PHEV',
        ranking_sort_hint: 'Primary sort: power consumption (low to high) · Click "Weight" column to toggle secondary sort',
        ranking_col_rank: 'Rank',
        ranking_col_model: 'Model',
        ranking_col_brand: 'Brand',
        ranking_col_type: 'Type',
        ranking_col_consumption: 'Power/100km',
        ranking_col_weight: 'Weight',
        ranking_col_range: 'Range',
        ranking_col_price: 'Price',
        ranking_col_action: 'Action',
        ranking_review_btn: 'Dashboard',
        ranking_empty: 'No models match the current filter',

        alert_center_title: 'Market Alert Subscription Center',
        alert_center_subtitle: 'Set monitoring rules, the system tracks market pulse automatically and pushes anomalies instantly',
        alert_check_now: 'Check Now',
        alert_add_rule: 'New Rule',
        alert_stat_total: 'Total Rules',
        alert_stat_active: 'Active',
        alert_stat_unread: 'Unread Alerts',
        alert_my_rules: 'My Monitoring Rules',
        alert_empty_state: 'No monitoring rules yet',
        alert_empty_hint: 'Click "New Rule" in the top right to start subscribing to market alerts',

        rule_modal_title_new: 'New Monitoring Rule',
        rule_modal_title_edit: 'Edit Monitoring Rule',
        rule_name_label: 'Rule Name',
        rule_name_placeholder: 'e.g. Tesla quarterly sales monitoring',
        rule_type_label: 'Rule Type',
        rule_type_sales: 'Sales Alert',
        rule_type_pile: 'Charging Pile Alert',
        rule_dimension_label: 'Dimension',
        rule_dim_brand: 'Brand Dimension',
        rule_dim_region: 'Region Dimension',
        rule_dim_brand_region: 'Brand + Region',
        rule_dim_province: 'Province Dimension',
        rule_target_brand_label: 'Select Brand',
        rule_target_brand_placeholder: '-- Select brand --',
        rule_target_brand_all: 'All Brands',
        rule_target_region_label: 'Select Province',
        rule_target_region_placeholder: '-- Select province --',
        rule_target_region2_label: 'Province',
        rule_target_brand2_label: 'Brand (Optional)',
        rule_metric_label: 'Metric',
        rule_condition_label: 'Condition',
        rule_threshold_label: 'Threshold',
        rule_threshold_placeholder: 'Enter threshold',
        rule_consecutive_label: 'Consecutive Periods',
        rule_consecutive_placeholder: 'Number of periods',
        rule_preview_label: 'Rule Preview',
        rule_preview_placeholder: 'Fill in rule parameters...',
        rule_save_btn: 'Save Rule',
        rule_update_btn: 'Update Rule',
        rule_btn_cancel: 'Cancel',

        metric_sales_quantity: 'Sales Quantity',
        metric_sales_change_rate: 'QoQ Change Rate (%)',
        metric_pile_density: 'Density',
        metric_pile_consecutive_decline: 'Consecutive Declines',

        cond_gt: 'Greater Than (>)',
        cond_gte: 'Greater or Equal (≥)',
        cond_lt: 'Less Than (<)',
        cond_lte: 'Less or Equal (≤)',
        cond_eq: 'Equal (=)',

        preview_metric_quantity: 'Sales',
        preview_metric_change_rate: 'Sales QoQ change rate',
        preview_metric_density: 'Charging pile density',
        preview_metric_consecutive_decline: 'Consecutive decline periods',
        preview_cond_gt: 'greater than',
        preview_cond_gte: 'greater than or equal to',
        preview_cond_lt: 'less than',
        preview_cond_lte: 'less than or equal to',
        preview_cond_eq: 'equal to',
        preview_when: 'When',
        preview_target: 'Target',
        preview_trigger: 'will trigger alert',
        preview_periods_consecutive: 'for',
        preview_periods_declines: 'consecutive periods, trigger alert',

        rule_type_label_sales: 'Sales Alert',
        rule_type_label_pile: 'Charging Alert',
        rule_desc_created: 'Created',
        rule_desc_last_checked: 'Last Check',
        rule_enabled: 'Rule enabled',
        rule_disabled: 'Rule paused',
        rule_deleted: 'Rule deleted',
        rule_updated: 'Rule updated',
        rule_created: 'Rule created successfully',
        rule_delete_confirm: 'Are you sure you want to delete this monitoring rule? This action cannot be undone.',

        alert_checking: 'Checking all rules...',
        alert_check_triggered: 'Check complete: N alerts found!',
        alert_check_clean: 'Check complete: no anomalies found (N rules checked)',
        alert_check_failed: 'Check failed',

        toast_save_success: 'Preset saved',
        toast_save_updated: 'Preset updated',
        toast_rename_success: 'Preset renamed',
        toast_delete_success: 'Preset deleted',
        toast_apply_success: 'Preset applied',
        toast_mark_public: 'Preset marked as public',
        toast_unmark_public: 'Preset made private',
        toast_preset_name_empty: 'Please enter a preset name',
        toast_preset_duplicate: 'You already have a preset with this name',
        toast_preset_invalid: 'Invalid filter parameters',
        toast_preset_load_failed: 'Failed to load preset list',
        toast_preset_select_first: 'Please select a preset first',
        toast_preset_no_permission_edit: 'No permission to edit this preset',
        toast_preset_no_permission_delete: 'No permission to delete this preset',
        toast_preset_no_permission_public: 'No permission to perform this action',
        toast_preset_delete_confirm_prefix: 'Are you sure you want to delete preset "',
        toast_preset_delete_confirm_suffix: '"? This action cannot be undone.',
        toast_preset_unmark_confirm_prefix: 'Are you sure you want to make preset "',
        toast_preset_unmark_confirm_suffix: '" private? Other users will no longer have access.',
        toast_preset_mark_confirm_prefix: 'Are you sure you want to make preset "',
        toast_preset_mark_confirm_suffix: '" public? All users will be able to view and use it.',
        toast_preset_cancel_public: 'Make Private',
        toast_preset_mark_as_public: 'Make Public',

        toast_map_load_failed: 'Map load failed, please check your network',
        toast_brand_filtered_prefix: 'Brand filtered: ',
        toast_position_brand_prefix: 'Located to brand: ',
        toast_position_model_prefix: 'Located to model: ',
        toast_model_not_found_prefix: 'Model ',
        toast_model_not_found_suffix: ' is not in the current filter results',

        toast_select_car_first: 'Please select a car first',
        toast_select_rating: 'Please select a rating',
        toast_fill_review: 'Please enter review content',
        toast_review_submitting: 'Submitting...',
        toast_review_failed: 'Submit failed, please retry',

        toast_rule_name_empty: 'Please enter a rule name',
        toast_rule_target_empty: 'Please select a monitoring target',
        toast_rule_threshold_empty: 'Please enter a threshold',
        toast_rule_save_failed: 'Save failed, please retry',
        toast_rule_select_first: 'Please select a preset first',
        toast_rule_no_permission: 'No permission',
        toast_operation_failed: 'Operation failed',
        toast_all_read: 'All marked as read',
        toast_mark_read_failed: 'Operation failed',
        toast_load_failed: 'Load failed',
        toast_notification_loading: 'Loading...',
        toast_initialized: 'Data initialized successfully',
        toast_db_init_title: 'Reset Database',
        toast_db_init_confirm: 'Are you sure you want to delete existing records and initialize mock data?',

        lang_zh: '中文',
        lang_en: 'English',
        lang_switch_tooltip: 'Switch language',

        tour_step_title_filter: 'Filter Panel',
        tour_step_desc_filter: 'Here you can filter data by brand, city, price, range, and more. All charts update automatically when you adjust filters.',
        tour_step_title_bar: 'Multi-dimensional Bar Chart',
        tour_step_desc_bar: 'Shows range, price, and power consumption comparison across models. Click a brand in the chart to quickly filter data for that brand.',
        tour_step_title_map: 'Map View Toggle',
        tour_step_desc_map: 'Switch between "Sales Heatmap" and "Charging Density" views to gain insights from different perspectives.',
        tour_step_title_pie: 'Regional Pie Chart',
        tour_step_desc_pie: 'Shows brand market share for the selected city. Click a brand segment to quickly filter for that brand.',
        tour_step_num: 'Step',
        tour_step_total: 'of',
        tour_step_suffix: '',
        tour_skip: 'Skip Tour',
        tour_continue: 'Continue',
        tour_complete: 'Finish',

        login_title: 'Sign In',
        login_username: 'Username',
        login_username_placeholder: 'Enter username',
        login_password: 'Password',
        login_password_placeholder: 'Enter password',
        login_submit: 'Sign In',
        login_no_account: "Don't have an account?",
        login_create_account: 'Create one',

        register_title: 'Create Account',
        register_username: 'Username',
        register_username_placeholder: 'Use Chinese or English',
        register_password: 'Password',
        register_password_placeholder: 'Minimum 6 characters',
        register_submit: 'Register',
        register_has_account: 'Already have an account?',
        register_login_now: 'Sign In',

        chpwd_title: 'Change Password',
        chpwd_old_password: 'Current Password',
        chpwd_new_password: 'New Password',
        chpwd_submit: 'Update Password',
        chpwd_tour_title: 'Quick Tour',
        chpwd_tour_desc: 'Replay the dashboard walkthrough to refresh on core features.',
        chpwd_tour_restart: 'Start Tour',

        settings_title: 'System Appearance',
        settings_site_title_label: 'Site Title',
        settings_site_title_placeholder: 'Enter site title',
        settings_site_title_hint: 'Displayed in browser tabs and navigation. Users see changes after refresh.',
        settings_default_city_label: 'Default City for New Users',
        settings_default_city_hint: 'Only applies to first-time visitors without custom preferences or link-specified cities.',
        settings_map_scheme_label: 'Map Heat Color Scheme',
        settings_scheme_cool: 'Cool Tones',
        settings_scheme_warm: 'Warm Tones',
        settings_map_scheme_hint: 'Choose color palette for map heatmap. Users see changes after refresh.',
        settings_self_register_label: 'Enable Self-Registration',
        settings_self_register_hint: 'When on, visitors can register accounts. When off, only admins can create users.',
        settings_save_btn: 'Save Settings',
        settings_saving: 'Saving...',
        settings_save_success: 'Settings saved! Refresh to see changes.',
        settings_save_failed: 'Save failed',
        settings_load_failed: 'Failed to load settings',

        admindata_title: 'Vehicle Data Management',
        admindata_add_btn: 'Add Vehicle',
        admindata_col_brand: 'Brand',
        admindata_col_model: 'Model',
        admindata_col_price: 'Price (10k CNY)',
        admindata_col_range: 'Range (km)',
        admindata_col_power: 'Power Cons.',
        admindata_col_weight: 'Weight (kg)',
        admindata_col_type: 'Type',
        admindata_col_action: 'Action',
        admindata_modal_edit_title: 'Edit Vehicle',
        admindata_modal_add_title: 'Add New Vehicle',
        admindata_label_brand: 'Brand',
        admindata_label_model: 'Model',
        admindata_label_price: 'Price (10k CNY)',
        admindata_label_range: 'Range (km)',
        admindata_label_power: 'Power (kWh)',
        admindata_label_weight: 'Weight (kg)',
        admindata_label_category: 'Powertrain',
        admindata_cat_ev: 'BEV',
        admindata_cat_hybrid: 'PHEV',
        admindata_btn_cancel: 'Cancel',
        admindata_btn_save: 'Save',
        admindata_btn_edit: 'Edit',
        admindata_btn_delete: 'Delete',
        admindata_save_success: 'Saved successfully',
        admindata_save_failed: 'Save failed',
        admindata_delete_success: 'Deleted',
        admindata_delete_failed: 'Delete failed',
        admindata_delete_confirm_title: 'Confirm Delete',
        admindata_delete_confirm_msg: 'Are you sure you want to delete this vehicle record?',

        adminusers_title: 'User Management',
        adminusers_add_btn: 'Add User',
        adminusers_col_username: 'Username',
        adminusers_col_role: 'Role',
        adminusers_col_action: 'Action',
        adminusers_modal_edit_title: 'Edit User',
        adminusers_modal_add_title: 'Add New User',
        adminusers_label_username: 'Username',
        adminusers_label_password: 'Password (leave blank to keep)',
        adminusers_label_role: 'Role',
        adminusers_role_user: 'User',
        adminusers_role_admin: 'Admin',
        adminusers_btn_cancel: 'Cancel',
        adminusers_btn_save: 'Save',
        adminusers_btn_edit: 'Edit',
        adminusers_btn_delete: 'Delete',
        adminusers_save_success: 'Saved successfully',
        adminusers_save_failed: 'Save failed',
        adminusers_delete_success: 'Deleted',
        adminusers_delete_failed: 'Delete failed',
        adminusers_delete_confirm_title: 'Confirm Delete',
        adminusers_delete_confirm_msg: 'Are you sure you want to delete this user?',
        adminusers_password_required: 'New users must have a password',

        adminreviews_title: 'Review Moderation',
        adminreviews_subtitle: 'Moderate user-submitted vehicle reviews — approve or reject with notes',
        adminreviews_stat_pending: 'Pending',
        adminreviews_stat_approved: 'Approved',
        adminreviews_stat_rejected: 'Rejected',
        adminreviews_tab_pending: 'Pending',
        adminreviews_tab_approved: 'Approved',
        adminreviews_tab_rejected: 'Rejected',
        adminreviews_loading: 'Loading...',
        adminreviews_empty_prefix: 'No ',
        adminreviews_empty_suffix: ' reviews',
        adminreviews_load_failed: 'Failed to load, please retry',
        adminreviews_modal_title: 'Moderate Review',
        adminreviews_admin_note_label: 'Moderator Note',
        adminreviews_admin_note_placeholder: 'Enter note (required for rejection)',
        adminreviews_btn_cancel: 'Cancel',
        adminreviews_btn_reject: 'Reject',
        adminreviews_btn_approve: 'Approve',
        adminreviews_modal_label_user: 'User: ',
        adminreviews_modal_label_car: 'Vehicle: ',
        adminreviews_modal_label_rating: 'Rating: ',
        adminreviews_modal_label_comment: 'Comment: ',
        adminreviews_note_required: 'Please enter a note when rejecting',
        adminreviews_operation_failed: 'Operation failed',
        adminreviews_retry_hint: 'Operation failed, please retry',
        adminreviews_status_approved: 'Approved',
        adminreviews_status_rejected: 'Rejected',
        adminreviews_reviewer_label: 'Moderator: ',
        adminreviews_reviewed_at_label: '',

        dq_title: 'Data Quality Dashboard',
        dq_subtitle: 'Auto-scan and categorize 4 types of data issues — fix with one click or quickly locate for editing',
        dq_scan_time_prefix: 'Scan Time: ',
        dq_btn_scan: 'Scan Now',
        dq_scanning: 'Scanning data...',
        dq_scan_failed: 'Scan failed',
        dq_scan_success_prefix: 'Scan complete, found ',
        dq_scan_success_suffix: ' issues',
        dq_stat_total: 'Total Issues',
        dq_stat_orphan: 'Orphan Vehicles',
        dq_stat_abnormal: 'Abnormal Sales',
        dq_stat_piles: 'Missing Pile Data',
        dq_stat_duplicate: 'Duplicate Models',
        dq_issue_orphan_title: 'Orphan Vehicles (No Sales)',
        dq_issue_abnormal_title: 'Abnormal Sales Records',
        dq_issue_piles_title: 'Provinces Missing Pile Data',
        dq_issue_dup_title: 'Duplicate Brand+Model Combos',
        dq_tag_auto_fix: 'Auto-fixable',
        dq_tag_manual: 'Manual Review',
        dq_orphan_desc: 'Vehicle records exist but have no sales data attached, which may cause incomplete chart statistics',
        dq_abnormal_desc: 'Sales ≤0 or exceeding 3 standard deviations from the mean',
        dq_piles_desc: 'Provinces missing charging pile density data for the latest period, causing blank map areas',
        dq_dup_desc: 'Multiple records with identical brand+model name — manually decide which to keep or merge',
        dq_btn_gen_sales: 'Generate Mock Sales',
        dq_btn_delete: 'Batch Delete',
        dq_btn_fix_normalize: 'Normalize to Mean',
        dq_btn_fix_piles: 'Fill Missing Data',
        dq_btn_goto_data: 'Go to Data Mgmt',
        dq_select_all: 'Select All',
        dq_col_brand: 'Brand',
        dq_col_model: 'Model',
        dq_col_price: 'Price',
        dq_col_range: 'Range',
        dq_col_type: 'Type',
        dq_col_region: 'Region',
        dq_col_period: 'Quarter',
        dq_col_sales: 'Sales',
        dq_col_reason: 'Reason',
        dq_col_province: 'Province',
        dq_col_data_period: 'Period',
        dq_col_brand_model: 'Brand/Model',
        dq_col_dup_count: 'Count',
        dq_col_instances: 'Instances',
        dq_col_action: 'Action',
        dq_empty: 'No issues',
        dq_empty_orphan: 'All good — every vehicle has sales data',
        dq_empty_abnormal: 'All good — sales data is normal',
        dq_empty_piles: 'All good — all provinces have pile data',
        dq_empty_dup: 'All good — brand+model combos are unique',
        dq_btn_edit: 'Edit',
        dq_dup_count_suffix: ' recs',
        dq_select_car_first: 'Please select vehicles to process',
        dq_select_record_first: 'Please select records to process',
        dq_select_province_first: 'Please select provinces to fill',
        dq_action_gen_sales: 'Generate Mock Sales',
        dq_action_delete_car: 'Delete Vehicles',
        dq_action_normalize: 'Normalize to Mean',
        dq_action_delete_record: 'Delete Records',
        dq_confirm_title: 'Confirm Action',
        dq_confirm_orphan_prefix: 'Are you sure you want to ',
        dq_confirm_orphan_suffix: ' for ',
        dq_confirm_abnormal_prefix: 'Are you sure you want to ',
        dq_confirm_abnormal_suffix: ' for ',
        dq_confirm_piles_prefix: 'Are you sure you want to fill pile data for ',
        dq_confirm_piles_suffix: ' provinces?',
        dq_fix_success_prefix: 'Successfully processed ',
        dq_fix_success_suffix: ' records',
        dq_fix_piles_success_prefix: 'Successfully filled data for ',
        dq_fix_piles_success_suffix: ' provinces',
        dq_fix_failed: 'Processing failed',

        report_title: 'Quarterly Review Report',
        report_subtitle: 'Admin-only · Generate structured quarterly review docs · Print & export supported',
        report_btn_print: 'Print / Export PDF',
        report_btn_regenerate: 'Regenerate',
        report_label_period: 'Target Quarter *',
        report_period_placeholder: '-- Select Quarter --',
        report_label_brands: 'Brands (optional, blank = all)',
        report_btn_generate: 'Generate Report',
        report_btn_generating: 'Generating...',
        report_empty_title: 'No Report Yet',
        report_empty_hint: 'Select a quarter and click "Generate Report"',
        report_main_title_prefix: '',
        report_main_title_suffix: ' NEV Quarterly Review Report',
        report_scope_label: 'Scope',
        report_scope_all: 'All Brands',
        report_gen_time_label: 'Generated',
        report_gen_user_label: 'By',
        report_confidential: 'Confidential · Internal Use Only',
        report_section1_title: 'Sales Overview',
        report_section1_subtitle: 'Sales Overview · Key quarterly metrics at a glance',
        report_chart_bar_title: 'Top 5 Brands by Sales',
        report_section2_title: 'Top 5 Brands',
        report_section2_subtitle: 'Top 5 Brands · Sales ranking & market share',
        report_col_rank: 'Rank',
        report_col_brand: 'Brand',
        report_col_quarter_sales: 'Qtr Sales',
        report_col_market_share: 'Share',
        report_col_qoq_change: 'QoQ',
        report_col_models: 'Models',
        report_col_top_model: 'Top Model',
        report_sub_top_models: 'Top 5 Models',
        report_unit_sales: 'units',
        report_models_count_suffix: ' models',
        report_section3_title: 'Regional Heatmap',
        report_section3_subtitle: 'Regional Heatmap · National sales distribution',
        report_map_title: 'National Sales Heatmap',
        report_sub_top_provinces: 'Top 5 Provinces',
        report_section4_title: 'Energy Efficiency Leaders',
        report_section4_subtitle: 'Energy Efficiency · Below-industry power consumption',
        report_es_models: 'Listed Models',
        report_es_models_suffix: '',
        report_es_avg_score: 'Avg Score',
        report_es_avg_score_suffix: 'pts',
        report_es_best_power: 'Best Power',
        report_es_best_power_suffix: 'kWh/100km',
        report_es_avg_power: 'Industry Avg',
        report_es_avg_power_suffix: 'kWh/100km',
        report_es_total_sales: 'Total Qtr Sales',
        report_es_total_sales_suffix: 'units',
        report_col_eff_category: 'Type',
        report_col_eff_power: 'Power/100km',
        report_col_eff_score: 'Score',
        report_col_eff_range: 'Range',
        report_col_eff_sales: 'Qtr Sales',
        report_col_eff_score_suffix: 'pts',
        report_col_eff_range_suffix: ' km',
        report_eff_power_suffix: ' kWh',
        report_section5_title: 'Summary',
        report_section5_subtitle: 'Report Summary · Key insights distilled',
        report_sig_user_label: 'Prepared by',
        report_sig_date_label: 'Date',
        report_period_required: 'Please select a target quarter',
        report_generate_failed: 'Report generation failed',
        report_generate_success: 'Report generated successfully!',
        report_meta_load_failed: 'Failed to load metadata',
        report_ov_total_sales: 'Total Qtr Sales',
        report_ov_total_sales_prev: 'Prev Qtr ',
        report_ov_total_sales_prev_suffix: ' units',
        report_ov_qoq: 'QoQ Change',
        report_ov_qoq_prev_period: 'vs ',
        report_ov_brands: 'Brands',
        report_ov_brands_suffix: '',
        report_ov_brands_models_suffix: ' models',
        report_ov_regions: 'Regions',
        report_ov_regions_suffix: '',
        report_ov_regions_sub: 'Nationwide province stats',
        report_unit_suffix: 'units',
        report_prev_period_prefix: '',
        report_summary_title_market: 'Market Size',
        report_summary_title_brand: 'Brand Landscape',
        report_summary_title_region: 'Regional Heat',
        report_summary_title_efficiency: 'Efficiency Leader',
        report_summary_up: 'up',
        report_summary_down: 'down',
        report_summary_rank23_prefix: '#2-3 are ',
        report_summary_rank23_mid: ' and ',
        report_summary_rank23_suffix: '.',

        sec_alert_title: 'Security Alert',
        sec_alert_desc_prefix: 'We detected a login from an unfamiliar location. Please confirm this was you. Login IP: ',
        sec_alert_desc_suffix: ', Login time: ',
        sec_alert_confirm: 'Confirm it was me',

        settings_personal_title: 'Personal Settings',
        settings_personal_subtitle: 'Manage your account security and login information',

        login_history_title: 'Login History',
        login_history_subtitle: 'Last 20 login records',
        login_history_col_time: 'Login Time',
        login_history_col_ip: 'IP Address',
        login_history_col_device: 'Device / Browser',
        login_history_col_status: 'Status',
        login_history_loading: 'Loading...',
        login_history_empty: 'No login records',
        login_history_load_failed: 'Failed to load',
        login_history_status_active: 'Active Session',
        login_history_status_ended: 'Session Ended',
        login_history_status_new: 'New Location',

        adminusers_btn_view_logs: 'Login Logs',
        admin_login_logs_title: 'User Login History',
        admin_login_logs_col_action: 'Action',
        admin_login_logs_btn_terminate: 'Terminate',
        admin_login_logs_ended: 'Ended',
        admin_terminate_confirm_title: 'Confirm Terminate Session',
        admin_terminate_confirm_msg: 'Are you sure you want to force terminate this user\'s login session? This will immediately invalidate the session.',
        admin_terminate_success: 'Session terminated successfully',
        admin_terminate_failed: 'Operation failed'
    }
};

let currentLanguage = localStorage.getItem('app_language') || 'zh-CN';

function t(key) {
    const translations = I18N_TRANSLATIONS[currentLanguage] || I18N_TRANSLATIONS['zh-CN'];
    return translations[key] || key;
}

function setLanguage(lang) {
    if (!I18N_TRANSLATIONS[lang]) lang = 'zh-CN';
    currentLanguage = lang;
    localStorage.setItem('app_language', lang);
    applyTranslations();
    document.documentElement.lang = lang === 'zh-CN' ? 'zh-CN' : 'en';
    if (typeof ChartLoader !== 'undefined' && ChartLoader.isInitialized()) {
        ChartLoader.refreshCharts();
    }
    if (typeof loadRankingData === 'function') {
        loadRankingData();
    }
    if (typeof loadRules === 'function') {
        loadRules();
    }
    if (typeof renderPresetDropdown === 'function') {
        renderPresetDropdown();
    }
    if (typeof renderNotifications === 'function' && typeof loadNotifications === 'function') {
        loadNotifications();
    }
}

function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (key) {
            el.textContent = t(key);
        }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (key) {
            el.placeholder = t(key);
        }
    });

    document.querySelectorAll('[data-i18n-title]').forEach(el => {
        const key = el.getAttribute('data-i18n-title');
        if (key) {
            el.title = t(key);
        }
    });

    document.querySelectorAll('[data-i18n-value]').forEach(el => {
        const key = el.getAttribute('data-i18n-value');
        if (key) {
            el.value = t(key);
        }
    });

    const togglePublicText = document.getElementById('btnTogglePublicText');
    if (togglePublicText) {
        const select = document.getElementById('presetSelect');
        if (select && select.value) {
            const preset = getPresetById ? getPresetById(parseInt(select.value)) : null;
            if (preset) {
                togglePublicText.textContent = preset.is_public ? t('preset_unmark_public') : t('preset_mark_public');
            }
        }
    }

    const langZhBtns = document.querySelectorAll('.lang-btn-zh');
    const langEnBtns = document.querySelectorAll('.lang-btn-en');
    if (langZhBtns.length && langEnBtns.length) {
        langZhBtns.forEach(btn => {
            currentLanguage === 'zh-CN' ? btn.classList.add('active') : btn.classList.remove('active');
        });
        langEnBtns.forEach(btn => {
            currentLanguage === 'en-US' ? btn.classList.add('active') : btn.classList.remove('active');
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.documentElement.lang = currentLanguage === 'zh-CN' ? 'zh-CN' : 'en';
    applyTranslations();
});

// ECharts Dark Theme Configuration
const echartsTheme = {
    color: ['#38bdf8', '#818cf8', '#c084fc', '#f472b6', '#fbbf24', '#10b981'],
    textStyle: { color: '#94a3b8' }
};

let currentSelection = {
    brand: '',
    city: '北京',
    drillDown: false
};

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

window.addEventListener('load', () => {
    ChartLoader.initCharts();
    if (ChartLoader.isInitialized()) {
        initCityFilter();
        ChartLoader.refreshCharts();

        const autoFilters = ['brandFilter', 'cityFilter', 'sortField', 'sortOrder', 'mapMode'];
        autoFilters.forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                el.onchange = function() {
                    if (id === 'cityFilter') {
                        saveCityPreference(this.value);
                        currentSelection.city = this.value;
                    }
                    ChartLoader.refreshCharts();
                };
            }
        });

        document.querySelectorAll('.cat-filter').forEach(cb => {
            cb.onchange = ChartLoader.refreshCharts;
        });

        let debounceTimer;
        const numInputs = ['priceMin', 'priceMax', 'rangeMin'];
        numInputs.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.oninput = () => {
                clearTimeout(debounceTimer);
                debounceTimer = setTimeout(ChartLoader.refreshCharts, 500);
            };
        });
    }
});

window.addEventListener('resize', () => {
    ChartLoader.resizeAll();
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
    showModal(t('modal_initdb_title'), t('modal_initdb_confirm'), () => {
        fetch('/admin/init_db')
            .then(r => r.json())
            .then(d => {
                showToast(d.status, 'success');
                ChartLoader.refreshCharts();
            })
            .catch(() => showToast(t('toast_initdb_failed'), 'danger'));
    });
}

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
                showToast(t('toast_located_brand').replace('{name}', brand), 'info');
            }
        }
    }
    
    setTimeout(() => {
        ChartLoader.refreshCharts();
        
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
            
            showToast(t('toast_located_model').replace('{name}', modelName), 'success');
        }
    });
    
    if (!found) {
        showToast(t('toast_model_not_in_filter').replace('{name}', modelName), 'info');
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
        titleKey: 'tour_step1_title',
        descKey: 'tour_step1_desc',
        placement: 'bottom'
    },
    {
        target: '#tour-bar-chart',
        titleKey: 'tour_step2_title',
        descKey: 'tour_step2_desc',
        placement: 'right'
    },
    {
        target: '#tour-map-mode',
        titleKey: 'tour_step3_title',
        descKey: 'tour_step3_desc',
        placement: 'bottom'
    },
    {
        target: '#tour-pie-chart',
        titleKey: 'tour_step4_title',
        descKey: 'tour_step4_desc',
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
        <div class="tour-step-num">${t('tour_step_num').replace('{current}', tourCurrentStep + 1).replace('{total}', tourSteps.length)}</div>
        <div class="tour-progress">${dots}</div>
        <h4>${t(step.titleKey)}</h4>
        <p>${t(step.descKey)}</p>
        <div class="tour-tooltip-actions">
            <button class="tour-btn-skip" onclick="endTour()">${isLast ? t('tour_btn_finish') : t('tour_btn_skip')}</button>
            <button class="tour-btn-next" onclick="nextTourStep()">${isLast ? t('tour_btn_finish') : t('tour_btn_next')}</button>
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

    ChartLoader.refreshCharts();
}

async function loadPresetList() {
    try {
        const res = await fetch('/api/filter_presets');
        if (!res.ok) throw new Error('加载失败');
        presetList = await res.json();
        renderPresetDropdown();
    } catch (e) {
        console.error('Failed to load presets:', e);
        showToast(t('toast_preset_list_load_failed'), 'danger');
    }
}

function renderPresetDropdown() {
    const select = document.getElementById('presetSelect');
    if (!select) return;

    const prevValue = select.value;
    select.innerHTML = `<option value="">-- ${t('preset_select_placeholder')} --</option>`;

    const minePresets = presetList.filter(p => p.is_mine);
    const publicPresets = presetList.filter(p => !p.is_mine && p.is_public);

    if (minePresets.length > 0) {
        const groupMine = document.createElement('optgroup');
        groupMine.label = t('preset_group_mine');
        minePresets.forEach(p => {
            const opt = document.createElement('option');
            opt.value = p.id;
            let name = p.name;
            if (p.is_public) name += ` [${t('preset_tag_public')}]`;
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
        groupPublic.label = t('preset_group_public');
        publicPresets.forEach(p => {
            const opt = document.createElement('option');
            opt.value = p.id;
            opt.textContent = `${p.name}  (${t('preset_tag_creator')}: ${p.owner_name})`;
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
            btnTogglePublicText.textContent = preset && preset.is_public ? t('preset_btn_unpublic') : t('preset_btn_public');
            btnTogglePublicText.setAttribute('data-i18n', preset && preset.is_public ? 'preset_btn_unpublic' : 'preset_btn_public');
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
    if (preset.is_mine) tags.push(`<span class="preset-tag preset-tag-mine" data-i18n="preset_tag_mine">${t('preset_tag_mine')}</span>`);
    if (preset.is_public) tags.push(`<span class="preset-tag preset-tag-public" data-i18n="preset_tag_public">${t('preset_tag_public')}</span>`);
    tags.push(`<span class="preset-tag preset-tag-owner"><span data-i18n="preset_tag_creator">${t('preset_tag_creator')}</span>: ${preset.owner_name}</span>`);
    tags.push(`<span class="preset-tag preset-tag-time">${preset.created_at}</span>`);

    infoContent.innerHTML = tags.join(' ');
}

function openSavePresetModal() {
    isEditMode = false;
    editingPresetId = null;
    document.getElementById('presetModalTitle').textContent = t('preset_modal_save_title');
    document.getElementById('presetModalTitle').setAttribute('data-i18n', 'preset_modal_save_title');
    document.getElementById('presetNameInput').value = '';
    document.getElementById('confirmSavePresetBtn').textContent = t('preset_btn_confirm_save');
    document.getElementById('confirmSavePresetBtn').setAttribute('data-i18n', 'preset_btn_confirm_save');
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
        showToast(t('toast_preset_enter_name'), 'danger');
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
            showToast(data.error || t('toast_preset_save_failed'), 'danger');
            return;
        }

        showToast(isEditMode ? t('toast_preset_updated') : t('toast_preset_saved'), 'success');
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
        showToast(t('toast_preset_save_failed_retry'), 'danger');
    }
}

function openRenamePresetModal() {
    if (!selectedPresetId) {
        showToast(t('toast_preset_select_one'), 'danger');
        return;
    }

    const preset = getPresetById(selectedPresetId);
    if (!preset || !preset.can_edit) {
        showToast(t('toast_preset_no_permission_edit'), 'danger');
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
        showToast(t('toast_preset_name_empty'), 'danger');
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
            showToast(data.error || t('toast_preset_rename_failed'), 'danger');
            return;
        }

        showToast(t('toast_preset_renamed'), 'success');
        closeRenamePresetModal();
        await loadPresetList();

        const select = document.getElementById('presetSelect');
        if (select) {
            select.value = selectedPresetId;
            onPresetSelectChange(select);
        }
    } catch (e) {
        console.error('Rename preset failed:', e);
        showToast(t('toast_preset_rename_failed'), 'danger');
    }
}

async function deleteSelectedPreset() {
    if (!selectedPresetId) {
        showToast(t('toast_preset_select_one'), 'danger');
        return;
    }

    const preset = getPresetById(selectedPresetId);
    if (!preset) return;

    if (!preset.can_delete) {
        showToast(t('toast_preset_no_permission_delete'), 'danger');
        return;
    }

    showModal(
        t('preset_modal_delete_title'),
        t('preset_modal_delete_confirm').replace('{name}', preset.name),
        async () => {
            try {
                const res = await fetch(`/api/filter_presets/${selectedPresetId}`, {
                    method: 'DELETE'
                });

                if (!res.ok) {
                    const data = await res.json();
                    showToast(data.error || t('toast_preset_delete_failed'), 'danger');
                    return;
                }

                showToast(t('toast_preset_deleted'), 'success');
                selectedPresetId = null;
                await loadPresetList();
            } catch (e) {
                console.error('Delete preset failed:', e);
                showToast(t('toast_preset_delete_failed'), 'danger');
            }
        }
    );
}

async function applySelectedPreset() {
    if (!selectedPresetId) {
        showToast(t('toast_preset_select_one'), 'danger');
        return;
    }

    const preset = getPresetById(selectedPresetId);
    if (!preset) return;

    applyFilters(preset.filters);
    showToast(t('toast_preset_applied').replace('{name}', preset.name), 'success');
}

async function togglePresetPublic() {
    if (!selectedPresetId) {
        showToast(t('toast_preset_select_one'), 'danger');
        return;
    }

    const preset = getPresetById(selectedPresetId);
    if (!preset || !preset.can_toggle_public) {
        showToast(t('toast_preset_no_permission'), 'danger');
        return;
    }

    const action = preset.is_public ? t('preset_modal_unpublic_title') : t('preset_modal_public_title');
    showModal(
        action,
        preset.is_public
            ? t('preset_modal_unpublic_confirm').replace('{name}', preset.name)
            : t('preset_modal_public_confirm').replace('{name}', preset.name),
        async () => {
            try {
                const res = await fetch(`/api/filter_presets/${selectedPresetId}/toggle_public`, {
                    method: 'POST'
                });

                const data = await res.json();
                if (!res.ok) {
                    showToast(data.error || t('toast_preset_operation_failed'), 'danger');
                    return;
                }

                showToast(
                    data.is_public ? t('toast_preset_marked_public').replace('{name}', data.name) : t('toast_preset_unmarked_public').replace('{name}', data.name),
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
                showToast(t('toast_preset_operation_failed'), 'danger');
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
            showToast(t('toast_all_marked_read'), 'success');
        }
    } catch (e) {
        console.error(e);
        showToast(t('toast_operation_failed'), 'danger');
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
                <span class="spec-label" data-i18n="car_sidebar_spec_range">${t('car_sidebar_spec_range')}</span>
                <span class="spec-value">${range} km</span>
            </div>
            <div class="spec-item">
                <span class="spec-label" data-i18n="car_sidebar_spec_price">${t('car_sidebar_spec_price')}</span>
                <span class="spec-value">${price} ${t('table_price_unit')}</span>
            </div>
            <div class="spec-item">
                <span class="spec-label" data-i18n="car_sidebar_spec_power">${t('car_sidebar_spec_power')}</span>
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
    summaryEl.innerHTML = `<div class="rating-summary-loading" data-i18n="car_sidebar_loading">${t('car_sidebar_loading')}</div>`;

    try {
        const res = await fetch(`/api/reviews/summary/${carId}`);
        const data = await res.json();

        const starsHtml = renderStars(data.avg_rating);
        summaryEl.innerHTML = `
            <div class="rating-score">${data.avg_rating > 0 ? data.avg_rating.toFixed(1) : '--'}</div>
            <div class="rating-stars-display">${starsHtml}</div>
            <div class="rating-count" data-i18n-count="${data.review_count}">${t('car_sidebar_review_count').replace('{count}', data.review_count)}</div>
        `;
    } catch (e) {
        summaryEl.innerHTML = `<div class="rating-summary-error" data-i18n="car_sidebar_load_failed">${t('car_sidebar_load_failed')}</div>`;
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
                statusBadge = `<span class="review-status review-pending" data-i18n="car_sidebar_status_pending">${t('car_sidebar_status_pending')}</span>`;
            } else if (review.status === 'approved') {
                statusBadge = `<span class="review-status review-approved" data-i18n="car_sidebar_status_approved">${t('car_sidebar_status_approved')}</span>`;
            } else if (review.status === 'rejected') {
                statusBadge = `<span class="review-status review-rejected" data-i18n="car_sidebar_status_rejected">${t('car_sidebar_status_rejected')}</span>`;
            }

            let adminNote = '';
            if (review.admin_note) {
                adminNote = `<div class="admin-note"><span data-i18n="car_sidebar_admin_note_label">${t('car_sidebar_admin_note_label')}</span>：${review.admin_note}</div>`;
            }

            statusEl.innerHTML = `
                <div class="existing-review">
                    <div class="existing-review-header">
                        <span data-i18n="car_sidebar_existing_review">${t('car_sidebar_existing_review')}</span>
                        ${statusBadge}
                    </div>
                    <div class="existing-review-rating">${renderStars(review.rating)}</div>
                    <div class="existing-review-comment">${review.comment}</div>
                    ${adminNote}
                    <div class="existing-review-time"><span data-i18n="car_sidebar_submit_time">${t('car_sidebar_submit_time')}</span>：${review.updated_at}</div>
                    <div class="review-overwrite-hint" data-i18n="car_sidebar_overwrite_hint">${t('car_sidebar_overwrite_hint')}</div>
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
        showToast(t('toast_please_select_car'), 'danger');
        return;
    }

    if (currentRating === 0) {
        showToast(t('toast_please_select_rating'), 'danger');
        return;
    }

    const comment = document.getElementById('reviewComment').value.trim();
    if (!comment) {
        showToast(t('toast_please_fill_comment'), 'danger');
        return;
    }

    const btn = document.getElementById('submitReviewBtn');
    btn.disabled = true;
    btn.textContent = t('car_sidebar_submitting');

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
            showToast(data.error || t('toast_submit_failed'), 'danger');
        }
    } catch (e) {
        showToast(t('toast_submit_failed_retry'), 'danger');
    } finally {
        btn.disabled = false;
        btn.textContent = t('car_sidebar_submit');
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

// ============ Login Security Center ============

function parseUserAgent(ua) {
    if (!ua) return 'Unknown';
    
    let browser = 'Unknown';
    let os = 'Unknown';
    
    if (/Edg\//i.test(ua)) browser = 'Edge';
    else if (/Chrome\//i.test(ua) && !/Edg\//i.test(ua)) browser = 'Chrome';
    else if (/Firefox\//i.test(ua)) browser = 'Firefox';
    else if (/Safari\//i.test(ua) && !/Chrome\//i.test(ua)) browser = 'Safari';
    else if (/Opera\//i.test(ua) || /OPR\//i.test(ua)) browser = 'Opera';
    
    if (/Windows NT 10/i.test(ua)) os = 'Windows 10/11';
    else if (/Windows NT 6/i.test(ua)) os = 'Windows 7/8';
    else if (/Mac OS X/i.test(ua)) os = 'macOS';
    else if (/Android/i.test(ua)) os = 'Android';
    else if (/iPhone|iPad|iPod/i.test(ua)) os = 'iOS';
    else if (/Linux/i.test(ua)) os = 'Linux';
    
    return `${os} · ${browser}`;
}

async function loadLoginHistory() {
    const tbody = document.getElementById('loginHistoryBody');
    if (!tbody) return;
    
    tbody.innerHTML = `<tr><td colspan="4" style="text-align: center; padding: 40px; color: var(--text-secondary);">${t('login_history_loading')}</td></tr>`;
    
    try {
        const res = await fetch('/api/user/login_logs');
        if (!res.ok) throw new Error('Failed to load');
        const logs = await res.json();
        
        if (!logs || logs.length === 0) {
            tbody.innerHTML = `<tr><td colspan="4" style="text-align: center; padding: 40px; color: var(--text-secondary);">${t('login_history_empty')}</td></tr>`;
            return;
        }
        
        tbody.innerHTML = logs.map(log => {
            const uaText = parseUserAgent(log.user_agent);
            let statusBadge = '';
            if (log.is_new_location) {
                statusBadge = `<span class="status-badge status-badge-warning">${t('login_history_status_new')}</span>`;
            } else if (log.is_active) {
                statusBadge = `<span class="status-badge status-badge-active">${t('login_history_status_active')}</span>`;
            } else {
                statusBadge = `<span class="status-badge status-badge-inactive">${t('login_history_status_ended')}</span>`;
            }
            
            return `
                <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.05);">
                    <td style="padding: 12px 16px; font-size: 13px; font-family: monospace;">${log.login_at}</td>
                    <td style="padding: 12px 16px; font-size: 13px; font-family: monospace;">${log.ip_address}</td>
                    <td style="padding: 12px 16px; font-size: 12px; color: var(--text-secondary);">${uaText}</td>
                    <td style="padding: 12px 16px;">${statusBadge}</td>
                </tr>
            `;
        }).join('');
    } catch (e) {
        tbody.innerHTML = `<tr><td colspan="4" style="text-align: center; padding: 40px; color: var(--text-secondary);">${t('login_history_load_failed')}</td></tr>`;
    }
}

let currentSecurityAlertLogId = null;

async function initSecurityAlert() {
    const banner = document.getElementById('securityAlertBanner');
    if (!banner) return;
    
    try {
        const res = await fetch('/api/user/latest_security_alert');
        if (!res.ok) return;
        const data = await res.json();
        
        if (data.has_alert) {
            currentSecurityAlertLogId = data.log_id;
            const ipEl = document.getElementById('secAlertIp');
            const timeEl = document.getElementById('secAlertTime');
            if (ipEl) ipEl.textContent = data.ip_address;
            if (timeEl) timeEl.textContent = data.login_at;
            banner.style.display = 'flex';
        }
    } catch (e) {
        // ignore
    }
}

function closeSecurityAlert() {
    const banner = document.getElementById('securityAlertBanner');
    if (banner) {
        banner.style.animation = 'slideOutUp 0.3s ease-out forwards';
        setTimeout(() => {
            banner.style.display = 'none';
        }, 300);
    }
}

async function acknowledgeSecurityAlert() {
    if (!currentSecurityAlertLogId) {
        closeSecurityAlert();
        return;
    }
    
    try {
        const res = await fetch(`/api/user/login_logs/${currentSecurityAlertLogId}/acknowledge`, {
            method: 'POST'
        });
        if (res.ok) {
            showToast(t('sec_alert_confirm'), 'success');
        }
    } catch (e) {
        // ignore
    }
    
    closeSecurityAlert();
}

// Auto-init security alert on dashboard
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('securityAlertBanner')) {
        initSecurityAlert();
    }
});

