#!/usr/bin/env node

const libxmljs = require("libxmljs");
const fs = require('fs')

const sayit2caption = (xmlData) => {
  const debateSection = xmlDoc.get('//debateSection');
  const heading = debateSection.get('//heading').text().trim();
  let colon = ''
  let speeches = []
  if (CheckEn(heading) === true) {
    colon = ':'
  } else {
    colon = '：'
  }
  debateSection.childNodes().map(child => {
    switch (child.name()) {
      case 'speech':
        const speaker = child.attr('by').value().replace('#', '')
        const content = child.text().trim()
        const speech = `${speaker}${colon}${content}`
        speeches.push(speech)
        break
    }
  })
  let temp = fs.readFileSync(process.argv[3], 'utf8');
  let captions = temp.split('\n')
  for (let i = 0; i < speeches.length; i++) {
    for (let j = 0; j < captions.length; j++) {
      captions[i * 3 + 1] = speeches[i] + '\r'
    }
  }
  fs.writeFileSync(process.argv[3], captions.join(''))
}

const CheckEn = (str) => {
  const reg = /^[a-zA-Z0-9$@$!%*?&#^\-_. +]+$/
  return reg.test(str)
}


const xml = fs.readFileSync(process.argv[2], 'utf-8')
const xmlDoc = libxmljs.parseXml(xml);
sayit2caption(xmlDoc)