exports.index = async(ctx, next) => {
  await ctx.render('index', {})
}