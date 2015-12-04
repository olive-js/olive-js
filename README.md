# hapi-fan-club




## Usage

```bash
$ echo "details coming soon"
```

## Deploying on Heroku

git clone https://github.com/smaxwellstewart/lummox
cd lummox
vim server/config/config.js
git commit -am 'configured lummox to my liking'
heroku create
heroku config:set MONGO_URI=mongodb://localhost:27017/lummox
heroku config:set JWT_SECRET=changeme
git push heroku master


## License

MIT
