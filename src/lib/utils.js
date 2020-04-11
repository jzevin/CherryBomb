
function log(ctx, ...stuff) {
  return;
  const prefix = ctx.constructor.name;
  console.log(`${prefix}=>`);
  console.log('\t', ...stuff);
}

export {
  log
}