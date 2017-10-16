from index import db, bcrypt


class Tag(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    tag_name = db.Column(db.String(255))
    image_url = db.Column(db.String(255))

    def __init__(self, tag_name, image_url):
        self.tag_name = tag_name
        self.active = True
        self.image_url = image_url


    @staticmethod
    def get_tag_with_image_url(imageurl):
        tag = Tag.query.filter_by(imageurl=image_url)
        return tag
