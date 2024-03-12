class TabsController {
    tabsView(req, res) {
        res.render('tabs/index', {layout: 'layout'});
    }
}

export default TabsController;