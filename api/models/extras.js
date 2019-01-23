module.exports = function renameIdToValue(doc, ret) {
  ret.value = ret._id;
  delete ret._id;
  delete ret.id;
  return ret;
};
