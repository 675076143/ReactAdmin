/*
* 菜单栏配置选项
* 根据此配置动态生成左侧菜单栏
* 使用map(menuConfig)
* 存在两种情况：
*   1.无子节点(<Menu.Item/>)
*   2.有子节点(<SubMenu><Menu.Item/></SubMenu>)
* 例：
* <Menu.Item key="/admin/home">
        <Link to='/admin/home'>
            <Icon type="pie-chart" />
            <span>首页</span>
        </Link>
   </Menu.Item>
*  <SubMenu
        key="sub1"
        title={
            <span>
                <Icon type="mail" />
                <span>图表</span>
            </span>
        }
    >
        <Menu.Item key="5">
            <Link to='/admin/home'>
                <Icon type="pie-chart" />
                <span>饼图</span>
            </Link>
        </Menu.Item>
    </SubMenu>
* */

const menuConfig = [
    {
        key:'/admin/home',
        icon:'pie-chart',
        title:'首页'
    },
    {
        key:'/admin/user',
        icon:'pie-chart',
        title:'用户管理'
    },
    {
        key:'/admin/chart',
        icon:'pie-chart',
        title:'图表',
        children:[
            {
                key:'/admin/bar',
                icon:'pie-chart',
                title:'柱状图'
            },
            {
                key:'/admin/line',
                icon:'pie-chart',
                title:'折线图'
            },
            {
                key:'/admin/pie',
                icon:'pie-chart',
                title:'饼状图'
            },
        ]
    }
]

export default menuConfig