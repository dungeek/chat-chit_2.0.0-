const renderHomePage = (_:any, res: any) => res.render(`home.ejs`);
const renderChatBox = (_:any, res:any) => res.render('gossip.ejs')

module.exports = {
    renderHomePage,
    renderChatBox,
}