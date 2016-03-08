	removebadge: function(target, room, user) {
		if (!this.can('pban')) return false;
		target = this.splitTarget(target);
		var targetUser = this.targetUser;
		if (!target) return this.sendReply('/removebadge [user], [badge] - Removes a badge from a user.');
		if (!targetUser) return this.sendReply('There is no user named ' + this.targetUsername + '.');
		var self = this;
		var type_of_badges = ['admin', 'bot', 'dev', 'vip', 'artist', 'mod', 'leader', 'champ', 'creator', 'comcun', 'twinner', 'goodra', 'league', 'fgs'];
		if (type_of_badges.indexOf(target) > -1 == false) return this.sendReply('The badge ' + target + ' is not a valid badge.');
		fs.readFile('badges.txt', 'utf8', function(err, data) {
			if (err) console.log(err);
			var match = false;
			var currentbadges = '';
			var row = ('' + data).split('\n');
			var line = '';
			for (var i = row.length; i > -1; i--) {
				if (!row[i]) continue;
				var split = row[i].split(':');
				if (split[0] == targetUser.userid) {
					match = true;
					currentbadges = split[1];
					line = row[i];
				}
			}
			if (match == true) {
				if (currentbadges.indexOf(target) > -1 == false) return self.sendReply(currentbadges); //'The user '+targetUser+' does not have the badge.');
				var re = new RegExp(line, 'g');
				currentbadges = currentbadges.replace(target, '');
				var newdata = data.replace(re, targetUser.userid + ':' + currentbadges);
				fs.writeFile('badges.txt', newdata, 'utf8', function(err, data) {
					if (err) console.log(err);
					return self.sendReply('You have removed the badge ' + target + ' from the user ' + targetUser + '.');
				});
			} else {
				return self.sendReply('There is no match for the user ' + targetUser + '.');
			}
		});
	},
	givevip: function(target, room, user) {
		if (!target) return this.errorReply("Usage: /givevip [user]");
		this.parse('/givebadge ' + target + ', vip');
	},
	takevip: function(target, room, user) {
		if (!target) return this.errorReply("Usage: /takevip [user]");
		this.parse('/removebadge ' + target + ', vip');
	},
	givebadge: function(target, room, user) {
		if (!this.can('pban')) return false;
		target = this.splitTarget(target);
		var targetUser = this.targetUser;
		if (!targetUser) return this.sendReply('There is no user named ' + this.targetUsername + '.');
		if (!target) return this.sendReply('/givebadge [user], [badge] - Gives a badge to a user. Requires: &~');
		var self = this;
		var type_of_badges = ['admin', 'bot', 'dev', 'vip', 'mod', 'artist', 'leader', 'champ', 'creator', 'comcun', 'twinner', 'league', 'fws'];
		if (type_of_badges.indexOf(target) > -1 == false) return this.sendReply('Ther is no badge named ' + target + '.');
		fs.readFile('badges.txt', 'utf8', function(err, data) {
			if (err) console.log(err);
			var currentbadges = '';
			var line = '';
			var row = ('' + data).split('\n');
			var match = false;
			for (var i = row.length; i > -1; i--) {
				if (!row[i]) continue;
				var split = row[i].split(':');
				if (split[0] == targetUser.userid) {
					match = true;
					currentbadges = split[1];
					line = row[i];
				}
			}
			if (match == true) {
				if (currentbadges.indexOf(target) > -1) return self.sendReply('The user ' + targerUser + ' already has the badge ' + target + '.');
				var re = new RegExp(line, 'g');
				var newdata = data.replace(re, targetUser.userid + ':' + currentbadges + target);
				fs.writeFile('badges.txt', newdata, function(err, data) {
					if (err) console.log(err);
					self.sendReply('You have given the badge ' + target + ' to the user ' + targetUser + '.');
					targetUser.send('You have recieved the badge ' + target + ' from the user ' + user.userid + '.');
					room.addRaw(targetUser + ' has recieved the ' + target + ' badge from ' + user.name);
				});
			} else {
				fs.appendFile('badges.txt', '\n' + targetUser.userid + ':' + target, function(err) {
					if (err) console.log(err);
					self.sendReply('You have given the badge ' + target + ' to the user ' + targetUser + '.');
					targetUser.send('You have recieved the badge ' + target + ' from the user ' + user.userid + '.');
				});
			}
		})
	},
	badgelist: function(target, room, user) {
		if (!this.canBroadcast()) return;
		var fws = '<img src="http://www.smogon.com/media/forums/images/badges/forummod_alum.png" title="Former Wish Staff">';
		var admin = '<img src="http://www.smogon.com/media/forums/images/badges/sop.png" title="Server Administrator">';
		var dev = '<img src="http://www.smogon.com/media/forums/images/badges/factory_foreman.png" title="Wish Developer">';
		var creator = '<img src="http://www.smogon.com/media/forums/images/badges/dragon.png" title="Server Creator">';
		var comcun = '<img src="http://www.smogon.com/media/forums/images/badges/cc.png" title="Community Contributor">';
		var leader = '<img src="http://www.smogon.com/media/forums/images/badges/aop.png" title="Server Leader">';
		var mod = '<img src="http://www.smogon.com/media/forums/images/badges/pyramid_king.png" title="Exceptional Staff Member">';
		var league = '<img src="http://www.smogon.com/media/forums/images/badges/forumsmod.png" title="Successful Room Founder">';
		var champ = '<img src="http://www.smogon.com/media/forums/images/badges/forumadmin_alum.png" title="League Champion">';
		var artist = '<img src="http://www.smogon.com/media/forums/images/badges/ladybug.png" title="Artist">';
		var twinner = '<img src="http://www.smogon.com/media/forums/images/badges/spl.png" title="Badge Tournament Winner">';
		var vip = '<img src="http://www.smogon.com/media/forums/images/badges/zeph.png" title="VIP">';
		var bot = '<img src="http://www.smogon.com/media/forums/images/badges/mind.png" title="Bot">';
		return this.sendReplyBox('<b>List of Snow Badges</b>:<br>' + fgs + '  ' + admin + '    ' + dev + '  ' + creator + '   ' + comcun + '    ' + mod + '    ' + leader + '    ' + league + '    ' + champ + '    ' + artist + '    ' + twinner + '    ' + vip + '    ' + bot + ' <br>--Hover over them to see the meaning of each.<br>--Get a badge and get a FREE custom avatar!<br>--Click <a href="http://goldserver.weebly.com/badges.html">here</a> to find out more about how to get a badge.');
	},
	badges: 'badge',
	badge: function(target, room, user) {
		if (!this.canBroadcast()) return;
		if (target == '') target = user.userid;
		target = this.splitTarget(target);
		var targetUser = this.targetUser;
		var matched = false;
		if (!targetUser) return false;
		var fws = '<img src="http://www.smogon.com/media/forums/images/badges/forummod_alum.png" title="Former Glacia Staff">';
		var admin = '<img src="http://www.smogon.com/media/forums/images/badges/sop.png" title="Server Administrator">';
		var dev = '<img src="http://www.smogon.com/media/forums/images/badges/factory_foreman.png" title="Glacia Developer">';
		var creator = '<img src="http://www.smogon.com/media/forums/images/badges/dragon.png" title="Server Creator">';
		var comcun = '<img src="http://www.smogon.com/media/forums/images/badges/cc.png" title="Community Contributor">';
		var leader = '<img src="http://www.smogon.com/media/forums/images/badges/aop.png" title="Server Leader">';
		var mod = '<img src="http://www.smogon.com/media/forums/images/badges/pyramid_king.png" title="Exceptional Staff Member">';
		var league = '<img src="http://www.smogon.com/media/forums/images/badges/forumsmod.png" title="Successful League Owner">';
		var srf = '<img src="http://www.smogon.com/media/forums/images/badges/forumadmin_alum.png" title="League Champion">';
		var artist = '<img src="http://www.smogon.com/media/forums/images/badges/ladybug.png" title="Artist">';
		var twinner = '<img src="http://www.smogon.com/media/forums/images/badges/spl.png" title="Badge Tournament Winner">';
		var vip = '<img src="http://www.smogon.com/media/forums/images/badges/zeph.png" title="VIP">';
		var bot = '<img src="http://www.smogon.com/media/forums/images/badges/mind.png" title="Bot">';
		var self = this;
		fs.readFile('badges.txt', 'utf8', function(err, data) {
			if (err) console.log(err);
			var row = ('' + data).split('\n');
			var match = false;
			var badges;
			for (var i = row.length; i > -1; i--) {
				if (!row[i]) continue;
				var split = row[i].split(':');
				if (split[0] == targetUser.userid) {
					match = true;
					currentbadges = split[1];
				}
			}
			if (match == true) {
				var badgelist = '';
				if (currentbadges.indexOf('fws') > -1) badgelist += ' ' + fws;
				if (currentbadges.indexOf('admin') > -1) badgelist += ' ' + admin;
				if (currentbadges.indexOf('dev') > -1) badgelist += ' ' + dev;
				if (currentbadges.indexOf('creator') > -1) badgelist += ' ' + creator;
				if (currentbadges.indexOf('comcun') > -1) badgelist += ' ' + comcun;
				if (currentbadges.indexOf('leader') > -1) badgelist += ' ' + leader;
				if (currentbadges.indexOf('mod') > -1) badgelist += ' ' + mod;
				if (currentbadges.indexOf('league') > -1) badgelist += ' ' + league;
				if (currentbadges.indexOf('champ') > -1) badgelist += ' ' + champ;
				if (currentbadges.indexOf('artist') > -1) badgelist += ' ' + artist;
				if (currentbadges.indexOf('twinner') > -1) badgelist += ' ' + twinner;
				if (currentbadges.indexOf('vip') > -1) badgelist += ' ' + vip;
				if (currentbadges.indexOf('bot') > -1) badgelist += ' ' + bot;
				self.sendReplyBox(targetUser.userid + "'s badges: " + badgelist);
				room.update();
			} else {
				self.sendReplyBox('User ' + targetUser.userid + ' has no badges.');
				room.update();
			}
		});
	},
	helixfossil: 'm8b',
	helix: 'm8b',
	magic8ball: 'm8b',
	m8b: function(target, room, user) {
		if (!this.canBroadcast()) return;
		var random = Math.floor(20 * Math.random()) + 1;
		var results = '';
		if (random == 1) {
			results = 'Signs point to yes.';
		}
		if (random == 2) {
			results = 'Yes.';
		}
		if (random == 3) {
			results = 'Reply hazy, try again.';
		}
		if (random == 4) {
			results = 'Without a doubt.';
		}
		if (random == 5) {
			results = 'My sources say no.';
		}
		if (random == 6) {
			results = 'As I see it, yes.';
		}
		if (random == 7) {
			results = 'You may rely on it.';
		}
		if (random == 8) {
			results = 'Concentrate and ask again.';
		}
		if (random == 9) {
			results = 'Outlook not so good.';
		}
		if (random == 10) {
			results = 'It is decidedly so.';
		}
		if (random == 11) {
			results = 'Better not tell you now.';
		}
		if (random == 12) {
			results = 'Very doubtful.';
		}
		if (random == 13) {
			results = 'Yes - definitely.';
		}
		if (random == 14) {
			results = 'It is certain.';
		}
		if (random == 15) {
			results = 'Cannot predict now.';
		}
		if (random == 16) {
			results = 'Most likely.';
		}
		if (random == 17) {
			results = 'Ask again later.';
		}
		if (random == 18) {
			results = 'My reply is no.';
		}
		if (random == 19) {
			results = 'Outlook good.';
		}
		if (random == 20) {
			results = 'Don\'t count on it.';
		}
		return this.sendReplyBox('' + results + '');
	},
	coins: 'coingame',
	coin: 'coingame',
	coingame: function(target, room, user) {
		if (!this.canBroadcast()) return;
		var random = Math.floor(2 * Math.random()) + 1;
		var results = '';
		if (random == 1) {
			results = '<img src="http://surviveourcollapse.com/wp-content/uploads/2013/01/zinc.png" width="15%" title="Heads!"><br>It\'s heads!';
		}
		if (random == 2) {
			results = '<img src="http://upload.wikimedia.org/wikipedia/commons/e/e5/2005_Penny_Rev_Unc_D.png" width="15%" title="Tails!"><br>It\'s tails!';
		}
		return this.sendReplyBox('<center><font size="3"><b>Coin Game!</b></font><br>' + results + '');
	},

	friendcodehelp: function(target, room, user) {
		if (!this.canBroadcast()) return;
		this.sendReplyBox('<b>Friend Code Help:</b> <br><br />' +
			'/friendcode (/fc) [friendcode] - Sets your Friend Code.<br />' +
			'/getcode (gc) - Sends you a popup of all of the registered user\'s Friend Codes.<br />' +
			'/deletecode [user] - Deletes this user\'s friend code from the server (Requires %, @, &, ~)<br>' +
			'<i>--Any questions, PM papew!</i>');
	},
	friendcode: 'fc',
	fc: function(target, room, user, connection) {
		if (!target) {
			return this.sendReply("Enter in your friend code. Make sure it's in the format: xxxx-xxxx-xxxx or xxxx xxxx xxxx or xxxxxxxxxxxx.");
		}
		var fc = target;
		fc = fc.replace(/-/g, '');
		fc = fc.replace(/ /g, '');
		if (isNaN(fc)) return this.sendReply("The friend code you submitted contains non-numerical characters. Make sure it's in the format: xxxx-xxxx-xxxx or xxxx xxxx xxxx or xxxxxxxxxxxx.");
		if (fc.length < 12) return this.sendReply("The friend code you have entered is not long enough! Make sure it's in the format: xxxx-xxxx-xxxx or xxxx xxxx xxxx or xxxxxxxxxxxx.");
		fc = fc.slice(0, 4) + '-' + fc.slice(4, 8) + '-' + fc.slice(8, 12);
		var codes = fs.readFileSync('config/friendcodes.txt', 'utf8');
		if (codes.toLowerCase().indexOf(user.name) > -1) {
			return this.sendReply("Your friend code is already here.");
		}
		fs.writeFileSync('config/friendcodes.txt', codes + '\n' + user.name + ': ' + fc);
		return this.sendReply("Your Friend Code: " + fc + " has been set.");
	},
	viewcode: 'gc',
	getcodes: 'gc',
	viewcodes: 'gc',
	vc: 'gc',
	getcode: 'gc',
	gc: function(target, room, user, connection) {
		var codes = fs.readFileSync('config/friendcodes.txt', 'utf8');
		return user.send('|popup|' + codes);
	},
