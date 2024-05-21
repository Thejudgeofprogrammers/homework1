module.exports.handlerCounterRequest = async (req, res, operation) => {
  try {
    const { id } = req.params;
    const count = await operation(id);
    res.json({ count });
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error" });
  };
};

module.exports.deleteKeyValue = async (req, res, operation) => {
  try {
    const { id } = req.params;
    await operation(id, (err, reply) => {
      if (err) {
        console.error(err);
        res.json({ msg: "Internal Server Error" });
      } else {
        console.log('Delete key: ', reply);
        res.json({ msg: "Успешное удаление ключа" });
      };
    });
  } catch (err) {
    console.error("Ошибка удаления из Redis");
    res.status(500).json({ msg: "Redis internal" });
  };
};