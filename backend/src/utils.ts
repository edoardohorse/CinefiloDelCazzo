type LogLevel = 'info' | 'warn' | 'error' | 'success';

const colors = {
	reset: '\x1b[0m',
	bright: '\x1b[1m',
	dim: '',
	red: '\x1b[31m',
	green: '\x1b[32m',
	yellow: '\x1b[33m',
	blue: '\x1b[34m',
	magenta: '\x1b[35m',
	cyan: '\x1b[36m',
	white: '\x1b[37m',
	bgRed: '\x1b[41m',
	bgYellow: '\x1b[43m'
};

const levelConfig = {
	info: { color: colors.blue, icon: 'ℹ️'},
	warn: { color: colors.yellow, icon: '⚠️'},
	error: { color: colors.red, icon: '❌'},
	success: { color: colors.green, icon: '✅'}
};


function logPrint(message: string, level: LogLevel = 'info') {
	const now = new Date();

	// Format time as hh:mm:ss
	const hours = String(now.getHours()).padStart(2, '0');
	const minutes = String(now.getMinutes()).padStart(2, '0');
	const seconds = String(now.getSeconds()).padStart(2, '0');
	const time = `${hours}:${minutes}:${seconds}`;

	// Format date as dd/mm/yyyy
	const day = String(now.getDate()).padStart(2, '0');
	const month = String(now.getMonth() + 1).padStart(2, '0');
	const year = now.getFullYear();
	const date = `${day}/${month}/${year}`;

	// ANSI color codes

	const config = levelConfig[level];

	const timePrint = `${colors.dim}[${colors.cyan}${time}${colors.reset}${colors.dim}`
	const datePrint = `${colors.green}${date}${colors.reset}${colors.dim}]`
	const icon = `${config.color}${config.icon}${colors.reset}${colors.dim}`
	console.log(
		`${timePrint} - ${datePrint} ${icon} ${config.color}${message}${colors.reset}`
	);
}

export const log = {
	info: (message: string)=>logPrint(message, 'info'),
	success: (message: string)=>logPrint(message, 'success'),
	error: (message: string)=>logPrint(message, 'error'),
	warn: (message: string)=>logPrint(message, 'warn'),
}