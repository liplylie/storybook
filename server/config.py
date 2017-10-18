import os
basedir = os.path.abspath(os.path.dirname(__file__))

class Config(object):

    SECRET_KEY = 'this-really-needs-to-be-changed'
    SQLALCHEMY_DATABASE_URI = 'postgres://zdhbeaoe:x_h7PkNBTqrc5CeucKQuTgByEq-D8lb8@pellefant.db.elephantsql.com:5432/zdhbeaoe'

class DevelopmentConfig(Config):

    DEBUG = True
    SQLALCHEMY_ECHO = True

class ProductionConfig(Config):

    DEBUG = False

app_config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig
}
