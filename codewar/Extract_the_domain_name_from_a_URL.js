function domainName(url) {
  url = url.toString().replace('https://', '').replace('http://', '').replace('www.', '');
  return url.split('.')[0];
}
