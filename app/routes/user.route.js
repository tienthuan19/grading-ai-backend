module.exports = (app) => {
    app.get("/api/v1/hi", (req, res) => {
        console.log("Hello World!");
    });
}