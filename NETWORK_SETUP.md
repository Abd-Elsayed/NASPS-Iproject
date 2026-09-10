# Running NASPS on a LAN (host: Z-LAPTOP)

Serve the app from one machine (`Z-LAPTOP`, LAN IP `10.4.8.169`) so other
devices on the same Wi-Fi can use it. Do **not** expose these ports to the
internet — this setup is for a trusted local network only.

## 1. Start the backend (ASP.NET Core API + SQL Server)

Open **PowerShell as Administrator** in the project folder:

```powershell
cd E:\NASPSintern\NASPS-Iproject\NASPS-Iproject

$env:ASPNETCORE_URLS="http://0.0.0.0:5222"
$env:Database__Provider="SqlServer"
$env:ConnectionStrings__Default="Server=Z-LAPTOP;Database=nasps_intern_app;Trusted_Connection=True;TrustServerCertificate=True;MultipleActiveResultSets=True"
$env:Cors__AllowedOrigins__0="http://10.4.8.169:4200"

dotnet run --project .\backend\Nasps.Api\Nasps.Api.csproj
```

- `0.0.0.0` makes Kestrel listen on every network interface, not just
  localhost — see the
  [Kestrel endpoints docs](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/servers/kestrel/endpoints?view=aspnetcore-10.0).
- `Cors__AllowedOrigins__0` is **required**. The API only accepts browser
  requests from origins on its allow-list (localhost by default), so the LAN
  frontend origin `http://10.4.8.169:4200` must be added or every API call
  from another device is blocked by CORS.
- EF Core migrations run automatically at startup. The `nasps_intern_app`
  database just needs to exist, or the login needs permission to create it.
- To use the default local SQLite database instead, omit the
  `Database__Provider` and `ConnectionStrings__Default` lines.

## 2. Start the Angular frontend

Open a **second** PowerShell terminal:

```powershell
cd E:\NASPSintern\NASPS-Iproject\NASPS-Iproject

npm install
npx ng serve --host 0.0.0.0 --port 4200
```

The frontend derives the API address from the browser URL
(`<host>:5222/api`), so a device opening `http://10.4.8.169:4200`
automatically calls the API on `10.4.8.169:5222` — no extra config.

## 3. Allow the ports through Windows Firewall

**PowerShell as Administrator** (run once):

```powershell
New-NetFirewallRule -DisplayName "NASPS Frontend 4200" -Direction Inbound -Protocol TCP -LocalPort 4200 -Action Allow -Profile Private
New-NetFirewallRule -DisplayName "NASPS API 5222" -Direction Inbound -Protocol TCP -LocalPort 5222 -Action Allow -Profile Private
```

## 4. Open the site from other devices

Connect every device to the **same Wi-Fi**, then open:

<http://10.4.8.169:4200>

Never use `127.0.0.1` / `localhost` on another device — it always points at
that device itself, not `Z-LAPTOP`.

Check the backend is reachable:

<http://10.4.8.169:5222/openapi/v1.json>

If that fails, test basic connectivity first:

```powershell
ping 10.4.8.169
```

## Troubleshooting

| Symptom | Likely cause |
| --- | --- |
| Site loads but every request fails with a CORS error | `Cors__AllowedOrigins__0` not set in step 1, or the IP differs |
| `openapi/v1.json` works locally but not from other devices | Firewall rule missing (step 3), or API bound to `localhost` not `0.0.0.0` |
| `ping` fails | Devices on different networks / Wi-Fi client isolation enabled on the router |
| Backend exits on startup with a SQL error | SQL Server not running, `Z-LAPTOP` instance name wrong, or no DB permission |
| The LAN IP changed | Re-run with the new IP in `Cors__AllowedOrigins__0` and the URL |
