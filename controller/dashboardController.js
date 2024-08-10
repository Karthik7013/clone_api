const getProfile = async (req, res) => {
    res.cookie('myCookie', 'cookieValue');
  
  res.send({
    data: {},
  });
};

module.exports = { getProfile };
