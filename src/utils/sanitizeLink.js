export const sanitizeLink = (event, router) => {
  const targetLink = event.target.closest("a");
  if (!targetLink) return;
  router.push(targetLink.href);
};
