"use strict";
module.exports = {
    apps: [
        {
            name: "poller",
            script: "./build/index.js",
            max_memory_restart: "400M",
            instances: 1,
            env: {
                NODE_ENV: "development",
            },
            env_production: {
                NODE_ENV: "production",
            },
        },
    ],
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWNvc3lzdGVtLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL2Vjb3N5c3RlbS5jb25maWcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUc7SUFDZixJQUFJLEVBQUU7UUFDSjtZQUNFLElBQUksRUFBRSxRQUFRO1lBQ2QsTUFBTSxFQUFFLGtCQUFrQjtZQUMxQixrQkFBa0IsRUFBRSxNQUFNO1lBQzFCLFNBQVMsRUFBRSxDQUFDO1lBQ1osR0FBRyxFQUFFO2dCQUNILFFBQVEsRUFBRSxhQUFhO2FBQ3hCO1lBQ0QsY0FBYyxFQUFFO2dCQUNkLFFBQVEsRUFBRSxZQUFZO2FBQ3ZCO1NBQ0Y7S0FDRjtDQUNGLENBQUMifQ==