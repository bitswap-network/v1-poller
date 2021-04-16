"use strict";
module.exports = {
    apps: [
        {
            name: "poller",
            script: "./build/index.js",
            max_memory_restart: "400M",
            instances: "max",
            env: {
                NODE_ENV: "development",
            },
            env_production: {
                NODE_ENV: "production",
            },
        },
    ],
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWNvc3lzdGVtLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL2Vjb3N5c3RlbS5jb25maWcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUc7SUFDZixJQUFJLEVBQUU7UUFDSjtZQUNFLElBQUksRUFBRSxRQUFRO1lBQ2QsTUFBTSxFQUFFLGtCQUFrQjtZQUMxQixrQkFBa0IsRUFBRSxNQUFNO1lBQzFCLFNBQVMsRUFBRSxLQUFLO1lBQ2hCLEdBQUcsRUFBRTtnQkFDSCxRQUFRLEVBQUUsYUFBYTthQUN4QjtZQUNELGNBQWMsRUFBRTtnQkFDZCxRQUFRLEVBQUUsWUFBWTthQUN2QjtTQUNGO0tBQ0Y7Q0FDRixDQUFDIn0=