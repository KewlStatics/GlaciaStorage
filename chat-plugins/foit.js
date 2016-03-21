exports.commands = {
  foit: function (target, room, user) {
    var targets = target.split(','),
    length = targets.length;
    while (length--)
      targets[length] = targets[length].trim();
    if (room.id === 'lobby' && this.can('broadcast', null, room)) {
      if (!target) return '(ง ͠ ͠° ل͜ °)ง';
      if (targets[0] && !targets[1]) return '(ง ͠ ͠° ل͜ °)ง ' + targets[0];
      if (targets[0] == 'pm' && targets[1] && !targets[2]) return this.parse('/pm ' + targets[1] + ', (ง ͠ ͠° ل͜ °)ง');
  }
  if (room.id === 'lobby' &&    !this.can('broadcast', null, room)) return this.errorReply('You must be voiced to use this command in this room.');
  else if (room.id !== 'lobby') {
   if (!target) return '(ง ͠ ͠° ل͜ °)ง';
   if (targets[0] && !targets[1]) return '(ง ͠ ͠° ل͜ °)ง ' + targets[0];
   if (targets[0] == 'pm' && targets[1] && !targets[2]) return this.parse('/pm ' + targets[1] + ', (ง ͠ ͠° ل͜ °)ง');
  }
},
  shrughelp: function () {
    if (!this.canBroadcast()) return;
     return this.sendReply('/foit - Makes you send \'(ง ͠ ͠° ل͜ °)ง' to the room.\n /foit example sends (ง ͠ ͠° ل͜ °)ง¯\' example\'.\n/foit pm, user - sends (ง ͠ ͠° ل͜ °)ง¯\' to the user.');
  },
};
