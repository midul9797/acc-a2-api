
let count = 0;

const viewCount = (req, res, next) => {
  count++;
  console.log(`viewCount: ${count}`);

  // res.send("tools found");
  next();
};

module.exports = viewCount;