export const adminView = async (req, res) => {
    res.render("admin/admin", {
        title: 'admin'
    } );
}