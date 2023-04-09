const corsConfig = {
    origin: ["https://devcollab.netlify.app", "http://localhost:3000"],
    credentials: true,
    methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
    allowedHeaders: ['Content-Type']
};

export default corsConfig;