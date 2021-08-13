<div align="center">
  <br />
  <p>
    <a href="https://github.com/xyligan-gp/des-games"><img src="https://github.com/xyligan-gp/des-games/blob/main/assets/des-games.png" width="546" alt="des-games" /></a>
  </p>
  <br/>
  <p>
    <a href="https://discord.gg/zzbkvCcu2r"><img src="https://img.shields.io/discord/827221018879328298?color=5865F2&logo=discord&logoColor=white" alt="Support server" /></a>
    <a href="https://www.npmjs.com/package/des-games"><img src="https://img.shields.io/npm/v/des-games.png?maxAge=3600" alt="NPM version" /></a>
    <a href="https://www.npmjs.com/package/des-games"><img src="https://img.shields.io/npm/dt/des-games.png?maxAge=3600" alt="NPM downloads" /></a>
  </p>
</div>

## Welcome
<b>Welcome! This 'des-games' module!</b><br>
<b>This is a powerful game addon for Discord Economy Super.</b>

## Installation

**Please note: Node.js 14.0.0 or newer is required.<br>
All types in brackets mean the type of what the method or event returns.**

Install [des-games](https://www.npmjs.com/package/des-games)
```JS
$ npm install des-games
```

## Features

* Simple & easy to use 👍
* Beginner friendly 😄
* Module base support 📃

## Module Managers
- 'UtilsManager' - <b>Manager that enables module Utils.</b>

## Module Constructor Options
- 'options.fishConfig.cooldown' - <b>Property responsible for the amount of time between games.</b>
- 'options.fishConfig.maxAmount' - <b>Property responsible for the maximum amount of rewards for the game.</b>

- 'options.huntConfig.cooldown' - <b>Property responsible for the amount of time between games.</b>
- 'options.huntConfig.maxAmount' - <b>Property responsible for the maximum amount of rewards for the game.</b>


## Quick Initialization Example

```JS
const Discord = require('discord.js');

const client = new Discord.Client();
const Economy = require('discord-economy-super');
const eco = new Economy();
const EconomyGames = require('des-games');
const games = new EconomyGames(eco);

client.on('ready', () => {
  console.log('Bot started!');
})

client.login('YOUR_BOT_TOKEN_HERE');
```

## Examples
<b><a href="https://github.com/xyligan-gp/des-games/blob/main/examples">Click here to see JavaScript examples.</a></b>


# Useful Links

* Module Developer: [xyligan](https://www.npmjs.com/~xyligan)
* Developer Discord: [♡ xүℓ[ι]gαη4εg ♡#9457](https://discord.com/users/533347075463577640)
* NPM: [Click](https://www.npmjs.com/package/des-games)
* GitHub: [Click](https://github.com/xyligan-gp/des-games)
* Examples: [Click](https://github.com/xyligan-gp/des-games/blob/main/examples)
* Support Server - [Click](https://discord.gg/zzbkvCcu2r)

<h1>Thanks for using DES Games ♥</h1>