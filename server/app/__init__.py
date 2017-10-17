from flask import Flask
from flask_assets import Environment, Bundle

#initialize app
app = Flask(__name__, instance_relative_config=True, static_folder="../../client/static", template_folder="../../client/static")

assets = Environment(app)
js = Bundle('bundle.js', output='gen/packed.js')
assets.register('js_all', js)

#load views
from app import views

#load configs
app.config.from_object('config')
