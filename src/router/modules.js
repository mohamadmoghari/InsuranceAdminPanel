export const asyncRequire = view => () => {

  const file = import(
    /* webpackChunkName: "view-[request]" */ `../components/${view}.vue`
    )
  file
    .then(res => {

    })
    .catch(er => {
      console.error(er)
    })
  return file
}
