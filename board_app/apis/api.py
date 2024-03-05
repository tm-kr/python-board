from board_app import app, db
from flask import jsonify, request
from ..schemas.schema import BoardSchema
from ..models.model import Board
from sqlalchemy import desc

@app.route('/board/load')
def loadBoard():
    result = BoardSchema().dump(db.session.query(Board).order_by(desc(Board.board_id)).all(), many=True)
    
    return jsonify(result)

@app.route('/board/detail/load')
def loadBoardDetail():
    result = BoardSchema().dump(db.session.query(Board).filter(Board.board_id == request.args.get("boardId")).first())
    
    return jsonify(result)

@app.route('/board/add', methods=["POST"])
def addBoard():
    data = request.json
    new_board = Board(**data)
    db.session.add(new_board)
    db.session.commit()
    
    return jsonify({"response": "complete"})    

@app.route('/board/modify', methods=["POST"])
def modifyBoard():
    data = request.json
    board_id = data.get('board_id')
    board_to_modify = Board.query.get(board_id)
    
    if board_to_modify:
        board_to_modify.board_title = data.get('board_title')
        board_to_modify.board_contents = data.get('board_contents')
        db.session.commit()
        return jsonify({"response": "complete"})
    else:
        return jsonify({"response": "fail"})
    
@app.route('/board/remove', methods=["POST"])
def removeBoard():
    data = request.json
    board_id = data.get('board_id') 
    board_to_delete = Board.query.get(board_id)

    if board_to_delete:
        db.session.delete(board_to_delete)
        db.session.commit()
        return jsonify({"response": "complete"})
    else:
        return jsonify({"response": "fail"})