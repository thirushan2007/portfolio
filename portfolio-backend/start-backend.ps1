# ─────────────────────────────────────────────────────────────────
# start-backend.ps1  —  Run Spring Boot with your MongoDB Atlas URI
# ─────────────────────────────────────────────────────────────────
# HOW TO USE:
#   1. Replace the URI below with your actual MongoDB Atlas connection string
#   2. Open PowerShell in portfolio-backend folder
#   3. Run:  .\start-backend.ps1

$env:MONGODB_URI    = "mongodb+srv://<USER>:<PASSWORD>@<CLUSTER>.mongodb.net/portfolio_db?retryWrites=true&w=majority"
$env:JWT_SECRET     = "ThisIsAVeryLongSecretKeyForJWTTokenGenerationPortfolio2024!"
$env:ADMIN_USERNAME = "admin"
$env:ADMIN_PASSWORD = "admin123"

Write-Host ""
Write-Host "  Starting Portfolio Backend..." -ForegroundColor Cyan
Write-Host "  MongoDB URI: $($env:MONGODB_URI.Substring(0,40))..." -ForegroundColor DarkGray
Write-Host ""

mvn spring-boot:run
