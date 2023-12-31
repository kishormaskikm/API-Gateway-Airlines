const express = require('express');
const rateLimit = require('express-rate-limit');
const { createProxyMiddleware } = require('http-proxy-middleware');

const { ServerConfig } = require('./config');
const apiRoutes = require('./routes');

const app = express();

const limiter = rateLimit({
	windowMs: 30 * 60 * 1000, // 30 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
})

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(limiter)

// app.use('/flightService', createProxyMiddleware({ 
//     target: ServerConfig.FLIGHT_SERVICE ,
//     changeOrigin: true,
//     pathRewrite: {
//     '^/api/old-path': '/api/new-path', // rewrite path
//     '^/api/remove/path': '/path', // remove base path
//   } 
// }));

//another way to setup proxy in this we dont need to set /api in forworder server (doest not add app.use("/flightService/api", apiRoutes);)


app.use('/flightService', createProxyMiddleware({ target: ServerConfig.FLIGHT_SERVICE ,changeOrigin: true }));
app.use('/bookingService', createProxyMiddleware({ target: ServerConfig.BOOKING_SERVICE , changeOrigin: true }));

app.use('/api', apiRoutes);

app.listen(ServerConfig.PORT, () => {
    console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
});
