export function print(value, json = false) {
  if (json) {
    process.stdout.write(`${JSON.stringify(value, null, 2)}\n`);
    return;
  }
  if (typeof value === 'string') process.stdout.write(`${value}\n`);
  else process.stdout.write(`${JSON.stringify(value, null, 2)}\n`);
}

export function formatInstall(results) {
  return results.map((item) => `${item.action.padEnd(13)} ${item.skill} -> ${item.agent} (${item.destination})`).join('\n');
}
