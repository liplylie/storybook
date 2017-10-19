import os
basedir = os.path.abspath(os.path.dirname(__file__))

class Config(object):
    """general app-wide settings"""

class DevelopmentConfig(Config):

    DEBUG = True
    SQLALCHEMY_ECHO = True

class ProductionConfig(Config):

    DEBUG = False

app_config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig
}
