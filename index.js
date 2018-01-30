"use strict";

const discord = require("discord.js");
const client = new discord.Client();
const MAX_FAILS = 3;

const TOKEN = "MzkwMTgzMzg2NjI0NDI1OTg2.DSAVnQ.yRPFjPeF3W3ib3iI_iLc7gnftqU";
let commands = [], commandDescriptions = [];

const aliases = {
	"Андромеда" : "And",
	"Близнецы" : "Gem",
	"Большая Медведица" : "UMa",
	"БМ" : "UMa",
	"Большой Пёс" : "CMa",
	"Большой Пес" : "CMa",
	"БПёс" : "CMa",
	"БПес" : "CMa",
	"Весы" : "Lib",
	"Водолей" : "Aqr",
	"Возничий" : "Aur",
	"Волк" : "Lup",
	"Волопас" : "Boo",
	"Волосы Вероники" : "Com",
	"Шевелюра" : "Com",
	"Ворон" : "Crv",
	"Геркулес" : "Her",
	"Гидра" : "Hya",
	"Голубь" : "Col",
	"Гончие Псы" : "CVn",
	"ГП" : "CVn",
	"Дева" : "Vir",
	"Дельфин" : "Del",
	"Дракон" : "Dra",
	"Единорог" : "Mon",
	"Жертвенник" : "Ara",
	"Жертвенный Огонь" : "Ara",
	"Живописец" : "Pic",
	"Жираф" : "Cam",
	"Журавль" : "Gru",
	"Заяц" : "Lep",
	"Змееносец" : "Oph",
	"Змея" : "Ser",
	"Золотая Рыба" : "Dor",
	"ЗРыба" : "Dor",
	"Индеец" : "Ind",
	"Кассиопея" : "Cas",
	"Киль" : "Car",
	"Кит" : "Cet",
	"Козерог" : "Cap",
	"Компас" : "Pyx",
	"Корма" : "Pup",
	"Лебедь" : "Cyg",
	"Лев" : "Leo",
	"Летучая Рыба" : "Vol",
	"ЛРыба" : "Vol",
	"Лира" : "Lyr",
	"Лисичка" : "Vul",
	"Малая Медведица" : "UMi",
	"ММ" : "UMi",
	"Малый Конь" : "Equ",
	"МКонь" : "Equ",
	"Малый Лев" : "LMi",
	"МЛев" : "LMi",
	"Малый Пёс" : "CMi",
	"Малый Пес" : "CMi",
	"МПёс" : "CMi",
	"МПес" : "CMi",
	"Микроскоп" : "Mic",
	"Муха" : "Mus",
	"Насос" : "Ant",
	"Наугольник" : "Nor",
	"Овен" : "Ari",
	"Октант" : "Oct",
	"Орёл" : "Aql",
	"Орел" : "Aql",
	"Орион" : "Ori",
	"Павлин" : "Pav",
	"Паруса" : "Vel",
	"Пегас" : "Peg",
	"Персей" : "Per",
	"Печь" : "For",
	"Райская Птица" : "Aps",
	"РПтица" : "Aps",
	"Рак" : "Cnc",
	"Резец" : "Cae",
	"Рыбы" : "Psc",
	"Рысь" : "Lyn",
	"Северная Корона" : "CrB",
	"СКорона" : "CrB",
	"Секстант" : "Sex",
	"Сетка" : "Ret",
	"Скорпион" : "Sco",
	"Скульптор" : "Scl",
	"Столовая Гора" : "Men",
	"Стрела" : "Sge",
	"Стрелец" : "Sgr",
	"Телескоп" : "Tel",
	"Телец" : "Tau",
	"Треугольник" : "Tri",
	"Тукан" : "Tuc",
	"Феникс" : "Phe",
	"Хамелеон" : "Cha",
	"Центавр" : "Cen",
	"Кентавр" : "Cen",
	"Цефей" : "Cep",
	"Циркуль" : "Cir",
	"Часы" : "Hor",
	"Чаша" : "Crt",
	"Щит" : "Sct",
	"Эридан" : "Eri",
	"Южная Гидра" : "Hyi",
	"ЮГидра" : "Hyi",
	"Южная Корона" : "CrA",
	"ЮКорона" : "CrA",
	"Южная Рыба" : "PsA",
	"ЮРыба" : "PsA",
	"Южный Крест" : "Cru",
	"ЮКрест" : "Cru",
	"Южный Треугольник" : "TrA",
	"ЮТреугольник" : "TrA",
	"Ящерица" : "Lac"
};
const revaliases = {
	"And" : "Андромеда",
	"Gem" : "Близнецы",
	"UMa" : "Большая Медведица",
	"CMa" : "Большой Пёс",
	"Lib" : "Весы",
	"Aqr" : "Водолей",
	"Aur" : "Возничий",
	"Lup" : "Волк",
	"Boo" : "Волопас",
	"Com" : "Волосы Вероники",
	"Crv" : "Ворон",
	"Her" : "Геркулес",
	"Hya" : "Гидра",
	"Col" : "Голубь",
	"CVn" : "Гончие Псы",
	"Vir" : "Дева",
	"Del" : "Дельфин",
	"Dra" : "Дракон",
	"Mon" : "Единорог",
	"Ara" : "Жертвенник",
	"Pic" : "Живописец",
	"Cam" : "Жираф",
	"Gru" : "Журавль",
	"Lep" : "Заяц",
	"Oph" : "Змееносец",
	"Ser" : "Змея",
	"Dor" : "Золотая Рыба",
	"Ind" : "Индеец",
	"Cas" : "Кассиопея",
	"Car" : "Киль",
	"Cet" : "Кит",
	"Cap" : "Козерог",
	"Pyx" : "Компас",
	"Pup" : "Корма",
	"Cyg" : "Лебедь",
	"Leo" : "Лев",
	"Vol" : "Летучая Рыба",
	"Lyr" : "Лира",
	"Vul" : "Лисичка",
	"UMi" : "Малая Медведица",
	"Equ" : "Малый Конь",
	"LMi" : "Малый Лев",
	"CMi" : "Малый Пёс",
	"Mic" : "Микроскоп",
	"Mus" : "Муха",
	"Ant" : "Насос",
	"Nor" : "Наугольник",
	"Ari" : "Овен",
	"Oct" : "Октант",
	"Aql" : "Орёл",
	"Ori" : "Орион",
	"Pav" : "Павлин",
	"Vel" : "Паруса",
	"Peg" : "Пегас",
	"Per" : "Персей",
	"For" : "Печь",
	"Aps" : "Райская Птица",
	"Cnc" : "Рак",
	"Cae" : "Резец",
	"Psc" : "Рыбы",
	"Lyn" : "Рысь",
	"CrB" : "Северная Корона",
	"Sex" : "Секстант",
	"Ret" : "Сетка",
	"Sco" : "Скорпион",
	"Scl" : "Скульптор",
	"Men" : "Столовая Гора",
	"Sge" : "Стрела",
	"Sgr" : "Стрелец",
	"Tel" : "Телескоп",
	"Tau" : "Телец",
	"Tri" : "Треугольник",
	"Tuc" : "Тукан",
	"Phe" : "Феникс",
	"Cha" : "Хамелеон",
	"Cen" : "Центавр",
	"Cep" : "Цефей",
	"Cir" : "Циркуль",
	"Hor" : "Часы",
	"Crt" : "Чаша",
	"Sct" : "Щит",
	"Eri" : "Эридан",
	"Hyi" : "Южная Гидра",
	"CrA" : "Южная Корона",
	"PsA" : "Южная Рыба",
	"Cru" : "Южный Крест",
	"TrA" : "Южный Треугольник",
	"Lac" : "Ящерица"
};
const matrix = {
	"And":["Tri","Per","Cas","Lac","Peg","Psc"],
	"Ant":["Hya","Pyx","Vel","Cen"],
	"Aps":["Oct","Pav","Ara","TrA","Cir","Mus","Cha"],
	"Aql":["Aqr","Del","Sge","Her","Oph","Ser","Sct","Sgr","Cap"],
	"Aqr":["Peg","Equ","Del","Aql","Cap","PsA","Scl","Cet","Psc"],
	"Ara":["CrA","Sco","Nor","TrA","Aps","Pav"],
	"Ari":["Per","Tri","Psc","Cet","Tau"],
	"Aur":["Lyn","Cam","Per","Tau","Gem"],
	"Boo":["Her","Dra","UMa","CVn","Com","Vir","Ser","CrB"],
	"Cae":["Col","Lep","Eri","Hor","Dor","Pic"],
	"Cam":["UMi","Cep","Cas","Per","Aur","Lyn","UMa","Dra"],
	"Cap":["Aqr","Aql","Sgr","Mic","PsA"],
	"Car":["Mus","Cen","Vel","Pup","Pic","Vol","Cha"],
	"Cas":["Cam","Cep","Lac","And","Per"],
	"Cen":["Lup","Hya","Ant","Vel","Car","Mus","Cru","Cir"],
	"Cep":["UMi","Dra","Cyg","Lac","Cas","Cam"],
	"Cet":["Tau","Ari","Psc","Aqr","Scl","For","Eri"],
	"Cha":["Oct","Aps","Mus","Car","Vol","Men"],
	"Cir":["Lup","Nor","TrA","Aps","Mus","Cen"],
	"CMa":["Mon","Lep","Col","Pup"],
	"CMi":["Mon","Gem","Cnc","Hya"],
	"Cnc":["Gem","Lyn","Leo","Hya","CMi"],
	"Col":["CMa","Lep","Cae","Pic","Pup"],
	"Com":["CVn","UMa","Leo","Vir","Boo"],
	"CrA":["Sgr","Sco","Ara","Tel"],
	"CrB":["Her","Boo","Ser"],
	"Crt":["Crv","Vir","Leo","Sex","Hya"],
	"Cru":["Cen","Mus"],
	"Crv":["Vir","Crt","Hya"],
	"CVn":["Boo","UMa","Com"],
	"Cyg":["Cep","Dra","Lyr","Vul","Peg","Lac"],
	"Del":["Equ","Peg","Vul","Sge","Aql","Aqr"],
	"Dor":["Pic","Cae","Hor","Ret","Hyi","Men","Vol"],
	"Dra":["UMi","Cam","UMa","Boo","Her","Lyr","Cyg","Cep"],
	"Equ":["Peg","Del","Aqr"],
	"Eri":["Ori","Tau","Cet","For","Phe","Hyi","Hor","Cae","Lep"],
	"For":["Eri","Cet","Scl","Phe"],
	"Gem":["Cnc","Lyn","Aur","Tau","Ori","Mon","CMi"],
	"Gru":["PsA","Mic","Ind","Tuc","Phe","Scl"],
	"Her":["Dra","Boo","CrB","Ser","Oph","Aql","Sge","Vul","Lyr"],
	"Hor":["Eri","Hyi","Ret","Dor","Cae"],
	"Hya":["Lib","Vir","Crv","Crt","Sex","Leo","Cnc","CMi","Mon","Pup","Pyx","Ant","Cen"],
	"Hyi":["Men","Dor","Ret","Hor","Eri","Tuc"],
	"Ind":["Tuc","Gru","Mic","Tel","Pav","Oct"],
	"Lac":["And","Cas","Cep","Cyg","Peg"],
	"Leo":["UMa","LMi","Cnc","Hya","Sex","Crt","Vir","Com"],
	"Lep":["Mon","Ori","Eri","Cae","Col","CMa"],
	"Lib":["Ser","Vir","Hya","Lup","Sco","Oph"],
	"LMi":["UMa","Lyn","Leo"],
	"Lup":["Sco","Lib","Cen","Cir","Nor"],
	"Lyn":["LMi","UMa","Cam","Aur","Gem","Cnc"],
	"Lyr":["Cyg","Dra","Her","Vul"],
	"Men":["Cha","Vol","Dor","Hyi","Oct"],
	"Mic":["Cap","Sgr","Ind","Gru","PsA"],
	"Mon":["Gem","Ori","Lep","CMa","Pup","Hya","CMi"],
	"Mus":["Cru","Cen","Car","Cha","Aps","Cir"],
	"Nor":["Sco","Lup","Cir","TrA","Ara"],
	"Oct":["Ind","Pav","Aps","Cha","Men","Hyi","Tuc"],
	"Oph":["Her","Ser","Lib","Sco","Sgr","Aql"],
	"Ori":["Gem","Tau","Eri","Lep","Mon"],
	"Pav":["Ind","Tel","Ara","Aps","Oct"],
	"Peg":["And","Lac","Cyg","Vul","Del","Equ","Aqr","Psc"],
	"Per":["Cam","Cas","And","Tri","Ari","Tau","Aur"],
	"Phe":["For","Scl","Gru","Tuc","Eri"],
	"Pic":["Col","Cae","Dor","Vol","Car"],
	"PsA":["Aqr","Cap","Mic","Gru","Scl"],
	"Psc":["Tri","And","Peg","Aqr","Cet","Ari"],
	"Pup":["Mon","CMa","Col","Pic","Car","Vel","Pyx","Hya"],
	"Pyx":["Ant","Hya","Pup","Vel"],
	"Ret":["Dor","Hor","Hyi"],
	"Scl":["Cet","Aqr","PsA","Gru","Phe","For"],
	"Sco":["Oph","Lib","Lup","Nor","Ara","CrA","Sgr"],
	"Sct":["Aql","Ser","Sgr"],
	"Ser":["Her","CrB","Boo","Vir","Lib","Oph","Sgr","Sct","Aql"],
	"Sex":["Crt","Leo","Hya"],
	"Sge":["Vul","Her","Aql","Del"],
	"Sgr":["Aql","Sct","Ser","Oph","Sco","CrA","Tel","Mic","Cap"],
	"Tau":["Aur","Per","Ari","Cet","Eri","Ori","Gem"],
	"Tel":["Sgr","CrA","Ara","Pav","Ind"],
	"TrA":["Nor","Cir","Aps","Ara"],
	"Tri":["Per","And","Psc","Ari"],
	"Tuc":["Phe","Gru","Ind","Oct","Hyi"],
	"UMa":["Dra","Cam","Lyn","LMi","Leo","Com","CVn","Boo"],
	"UMi":["Cep","Dra","Cam"],
	"Vel":["Ant","Pyx","Pup","Car","Cen"],
	"Vir":["Boo","Com","Leo","Crt","Crv","Hya","Lib","Ser"],
	"Vol":["Car","Pic","Dor","Men","Cha"],
	"Vul":["Cyg","Lyr","Her","Sge","Del","Peg"]
};

function createCommand(id, func, exec, desc, minArgs = 0, regex = /.*/, aliases = []) {
	commands[id] = function(req) {
		let res = req.content.split(" ");
		res[0] = res[0].substring(1);
		if (!regex.test(req.channel.name))
			return;
		if (res.length <= minArgs)
			req.reply("\nНедостаточно аргументов (требуется минимум " + minArgs + ", получено " + (res.length - 1) + ")!");
		else
			func(req, res);
	};
	if (aliases.length > 0) {
		desc += " (алиасы: " + aliases.join(", ") + ")";
		aliases.forEach(function(v) {
			commands[v] = commands[id];
		});
	}

	exec = "**`!" + id + " " + exec + "`**";

	commandDescriptions.push(exec + " - " + desc);
	console.log("Added !" + id + " command");
}
function addCategory(desc) {
	commandDescriptions.push("\n__***" + desc + "***__");
}

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getEnd(int, single, double, pentuple) {
	let x = int % 100;
	if (Math.floor(x / 10) == 1)
		return pentuple;
	x = x % 10;
	return x == 1 ? single : (x < 5 ? double : pentuple);
}

client.on("ready", () => {
	console.log("Bot activation started");
	// Misc commands
	addCategory("Разное");
	createCommand("help", req => {
		req.member.send("Список команд: \n" + commandDescriptions.join("\n"));
	}, "", "показать эту помощь");
	
	// Channel commands
	addCategory("Астрономическая 'карта'");
	createCommand("create_map_channel", (req, res) => {
		let guild = req.channel.guild;
		let i = Math.random() * Math.random();
		i = i.toString().substr(2);
		guild.createChannel("astromap_" + i, "text").then(channel => {
			guild.createChannel("astromapj_" + i, "text").then(ch1 => {
				channel.setTopic(res[1]).catch(console.error);
				let str = (+res[1] > 1 ? "" : "\nUMa");
				ch1.send("Журнал игры: " + str).then(msg => {
					ch1.send("Лажи: ").then(msg2 => {
						msg.pin().then(() => {
							msg2.pin().then(() => {
								if (+res[1] <= 1)
									ch1.send("<Бот> Большая Медведица").catch(console.error);
								else
									channel.send("!astromap_move UMa").catch(console.error);
							}).catch(console.error);
						}).catch(console.error);
					}).catch(console.error);
				}).catch(console.error);
			}).catch(console.error);
		}).catch(console.error);
	}, "<N:amount_of_bots>", "создать канал игры", 1, /^commands$/, ["cmc"]);

	createCommand("delete_all_old_channels", req => {
		let guild = req.channel.guild;
		let f = guild.channels.filter(x => !x.name.indexOf("astromap"));
		f.forEach(f1 => f1.delete());
	}, "", "удалить все каналы", 0, /^commands$/, ["daoc"]);
	createCommand("astromap_move", (req, res) => {
		let ch = req.channel;
		let bot_amount = +ch.topic, g = ch.guild;
		const name1 = "astromapj_" + ch.name.split("_")[1];
		const s = g.channels.find(r => r.name === name1);
		if (!s) {
			req.reply("\nОшибка: канал не найден!");
			return true;
		}

		s.fetchPinnedMessages().then(msgs => {
			let msgs1 = Array.from(msgs);
			let lazhas = msgs1.shift()[1], msg = msgs1.shift()[1];

			let lazhasArr = lazhas.content.split("\n");
			let x = msg.content.split("\n");
			let y = x[x.length - 1], z = aliases[res.slice(1).join(" ")] ? aliases[res.slice(1).join(" ")] : res.slice(1).join(" ");
			if (!matrix[z]) {
				req.reply("\nОшибка: созвездие не найдено!");
				return true;
			}
			if (x.find(msg1 => msg1 === z)) {
				req.reply("\nОшибка: созвездие уже названо!");
				return true;
			}
			if (z != "UMa" && !matrix[y].find(r => r == z)) {
				req.reply("\nЭто лажа");
				lazhasArr.push(req.author.username);
				lazhas.edit(lazhasArr.join("\n"));
				let arr = lazhasArr.filter(r => r == req.author.username);
				if (arr.length >= MAX_FAILS) {
					req.reply("\nУ вас " + MAX_FAILS + " лаж" + getEnd(MAX_FAILS, "а", "и", "") + ", вы проиграли");

					let mat = matrix[y].filter(r => !x.find(m => m == r));
					let r = getRandomInt(0, mat.length - 1);
					let constellation = mat[r];
					ch.send("Возможный ответ: " + revaliases[constellation] + " (" + constellation + ")");

					s.delete().catch(console.error);
				}
				return true;
			}
			
			x.push(z);
			msg.edit(x.join("\n"));
			s.send("<" + req.author.username + "> " + revaliases[z]);
			
			if (bot_amount > 0) {
				let mat = matrix[z].filter(r => !x.find(m => m == r));
				if (mat.length == 0)
					ch.send("Поздравляю с победой!");
				else {
					let r = getRandomInt(0, mat.length - 1);
					let constellation = mat[r];
					if (bot_amount == 1) {
						x.push(constellation);
						msg.edit(x.join("\n"));
						s.send("<Бот> " + revaliases[constellation]);
						ch.send("Мой ответ: " + revaliases[constellation] + " (" + constellation + ")");
						mat = matrix[constellation].filter(r => !x.find(m => m == r));
						if (mat.length == 0)
							ch.send("Вы проиграли!");
					} else {
						ch.send("!astromap_move " + constellation)
					}
				}
			}
		})
	}, "<S:constellation>", "назвать созвездие", 1, /^astromap_/, ["am"]);
	console.log("Bot activation ended");
});

client.on("message", message => {
	var msg = message.content.split(" ");
	if (msg[0][0] != "!") return;
	msg[0] = msg[0].slice(1);
	if (commands[msg[0]])
		commands[msg[0]](message);
});

client.login(TOKEN);
