module.exports = function hubot(robot) {
  const incrementRegExp = /([a-z0-9_\-\.]+)\s?\+{2,}/ig
  const decrementRegExp = /([a-z0-9_\-\.]+)\s?\-{2,}/ig
  const adjustRegExp = /([a-z0-9_\-\.]+)\s?[\+\-]{2,}/ig;

  robot.hear(adjustRegExp, (res) => {
    const {robot, message, match, envelope} = res;
    // const sendingUser = msg.message.user.name;
    let botResponse = '';
    const increments = message.text.match(incrementRegExp) || [];
    const decrements = message.text.match(decrementRegExp) || [];

    increments.forEach((match) => {
      const user = match.replace(/^([\w\.\-]+)\s?\+{2,}$/, '$1');

      if (user !== message.user.name) {
        const count = (robot.brain.get(user) || 0) + 1;
        robot.brain.set(user, count);
        botResponse = `${botResponse}Woot! @${user} now at ${count} — Gz!\n`;
      } else {
        botResponse = `${botResponse}Nice try @${user}! :wink:`;
      }
    });

    decrements.forEach((match) => {
      const user = match.replace(/^([\w\.\-]+)\s?\-{2,}$/, '$1');
      const count = (robot.brain.get(user) || 0);

      if (count > 0) {
        count--;
        robot.brain.set(user, count);
        botResponse = `${botResponse}OMG! @${user} now at ${count} — Sorry!\n`;
      } else {
        botResponse = `${botResponse}@${user} is already at 0 — Can't get much lower. :grimacing:\n`;
      }

    });

    return res.send(`${botResponse}`);
  });
};
