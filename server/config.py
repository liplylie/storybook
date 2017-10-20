import os
basedir = os.path.abspath(os.path.dirname(__file__))


class Config(object):
    """
    Common configurations
    """

    # Put any configurations here that are common across all environments
    # Declare which mode will be used when using app

class DevelopmentConfig(Config):

    DEBUG = True
    SQLALCHEMY_ECHO = True

class ProductionConfig(Config):

    DEBUG = False

app_config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig
}
