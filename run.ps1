param(
    [Parameter(Position=0)]
    [ValidateSet("dev", "test", "docker-build", "lint", "format", "install", "help")]
    [string]$Command = "help"
)

$ErrorActionPreference = "Stop"
$BackendDir = Join-Path $PSScriptRoot "backend"
$E2EDir = Join-Path $PSScriptRoot "e2e"

function Show-Help {
    Write-Host "Available commands:"
    Write-Host "  dev           Start local development server (Flask on port 5000)"
    Write-Host "  test          Run all tests (Python unit + e2e)"
    Write-Host "  docker-build  Build and start Docker containers"
    Write-Host "  lint          Run flake8 linting"
    Write-Host "  format        Run black formatter"
    Write-Host "  install       Install Python dependencies"
    Write-Host "  help          Show this help message"
}

switch ($Command) {
    "install" {
        Set-Location $BackendDir
        pip install -r requirements.txt -r requirements-dev.txt
    }
    "dev" {
        Set-Location $BackendDir
        $env:FLASK_APP = "run.py"
        $env:FLASK_ENV = "development"
        python run.py
    }
    "test" {
        Set-Location $BackendDir
        python -m pytest -v --tb=short
        if (Test-Path $E2EDir) {
            Set-Location $E2EDir
            npm test
        }
    }
    "docker-build" {
        Set-Location $PSScriptRoot
        docker-compose build
        docker-compose up -d
        Write-Host "App running at http://localhost:12903"
    }
    "lint" {
        Set-Location $BackendDir
        python -m flake8 app/
    }
    "format" {
        Set-Location $BackendDir
        python -m black app/
    }
    "help" {
        Show-Help
    }
}
