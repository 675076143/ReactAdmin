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
        key:'/home',
        icon:'home',
        title:'首页',
        isPublic:true
    },
    {
        key:'/user',
        icon:'user',
        title:'用户管理'
    },
    {
        key:'/role',
        icon:'safety-certificate',
        title:'角色管理'

    },
    {
        key:'/products',
        icon:'appstore',
        title:'商品',
        children:[
            {
                key:'/category',
                icon:'edit',
                title:'品类管理'
            },
            {
                key:'/product',
                icon:'edit',
                title:'商品管理'
            }
        ]
    },
    {
        key:'/chart',
        icon:'pie-chart',
        title:'图表',
        children:[
            {
                key:'/bar',
                icon:'bar-chart',
                title:'柱状图'
            },
            {
                key:'/line',
                icon:'line-chart',
                title:'折线图'
            },
            {
                key:'/pie',
                icon:'pie-chart',
                title:'饼状图'
            },
        ]
    },
    {
        key:'/api',
        icon:'api',
        title:'接口文档'
    }
]

export default menuConfig