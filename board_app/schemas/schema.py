from flask_marshmallow import Marshmallow
from marshmallow import fields

ma = Marshmallow()  # 이 부분은 삭제합니다.

class BoardSchema(ma.Schema):
    board_id = fields.Integer()  # Integer 타입으로 수정
    board_title = fields.String()
    board_contents = fields.String()
    writer = fields.String()
    create_date = fields.Date()  # Date 타입으로 수정
    views = fields.Integer()  # Integer 타입으로 수정