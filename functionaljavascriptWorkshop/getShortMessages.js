function getShortMessages(messages) {
  return messages
          .filter(msgObj => msgObj.message.length < 50)
          .map(msgObj => msgObj.message);
}

module.exports = getShortMessages
