module.exports = (app) =>{
    app.get("/home", (req, res) => {
        // console.log(req.app.get('user'));
        res.send(req.app.get('user'));
    })
}