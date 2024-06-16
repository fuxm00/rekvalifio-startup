# rekvalifio-startup
Informační systém pro rekvalifiakční střediska.

Aplikace se spouští příkazem `npm run dev` nebo `npm run prod` pro spuštění ve vývojovém nebo produkčním prostředí.
Po stažení repozitáře je nutné zadat příkaz `npm install` pro instalaci závyslostí projektu.
Pro správné fungování je dále v kořenovém adresáři nutné definovat proměnné v souboru .env. Jedná se o proměnné:
```
PORT – port, na kterém má server naslouchat,

SESSION_SECRET – slouží k podepisování ID session cookies.
```
Před prvním spuštění aplikace je nutné zadat příkaz `npm run mig`, který vytvoří SQLite databázi a aplikuje na ní všechny definované migrace.
