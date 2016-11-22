module.exports = function hubot(robot) {
  const incrementRegExp = /^([a-z0-9_\-\.\@]+)(\s{1})?\+{2,}$/ig;
  const decrementRegExp = /^([a-z0-9_\-\.\@]+)(\s{1})?\-{2,}$/ig;
  const adjustRegExp = /([a-z0-9_\-\.]+)\s?[\+\-]{2,}/ig;

  robot.hear(adjustRegExp, (res) => {
    const {robot, message, match, envelope} = res;
    // const sendingUser = msg.message.user.name;
    let botResponse = '';
    const increments = message.text.match(incrementRegExp) || [];
    const decrements = message.text.match(decrementRegExp) || [];

    if (message.text.toLowerCase() === 'c++') {
      return;
    }
    
    increments.forEach((match) => {
      const user = match.replace(/^([\w\.\-]+)\s?\+{2,}$/, '$1');

      if (user !== message.user.name) {
        const count = (robot.brain.get(user) || 0) + 1;
        robot.brain.set(user, count);
        botResponse = `${botResponse} ${user}'s karma has increased to ${count}\n`;
      }
    });

    decrements.forEach((match) => {
      const user = match.replace(/^([\w\.\-]+)\s?\-{2,}$/, '$1');
      const count = (robot.brain.get(user) || 0) - 1;

      robot.brain.set(user, count);
      botResponse = `${botResponse} ${user}'s karma has decreased to ${count}\n`;
    });

    return res.send(`${botResponse}`);
  });
};
