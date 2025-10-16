from fastapi import HTTPException

class FenConverter:
    def __init__(
            self, 
            matrix_default_value: int = -1, 
            min_confidence: float = 0.6,
            normalized_square_size: float = 0.125 # 1/8
        ):
        
        self.MATRIX_DEFAULT_VALUE = matrix_default_value
        self.MIN_CONFIDENCE = min_confidence
        self.NORMALIZED_SQUARE_SIZE = normalized_square_size


    def boxes_to_matrix(self, boxes):

        chessboard_matrix = [[self.MATRIX_DEFAULT_VALUE for _ in range(8)] for _ in range(8)] 

        try:
            if boxes is None:
                raise HTTPException(status_code =400, detail="Boxes object is empty")

            for box in boxes:
                if box.conf > self.MIN_CONFIDENCE:
                    x_center, y_center, _, _ = box.xywhn[0].tolist()

                    # This trick enable me to avoid a O(N^2) algorithm to convert each center in a normalized index.
                    x_index = int(x_center // (self.NORMALIZED_SQUARE_SIZE))
                    y_index = int(y_center // (self.NORMALIZED_SQUARE_SIZE))

                    piece_class = int(box.cls) 

                    chessboard_matrix[y_index][x_index] = piece_class

        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

        return chessboard_matrix

    def to_fen(self, matrix):
        # If I change the model, I will need to change this variable too.
        id_to_piece = {
            0: 'P', 1: 'N', 2: 'B', 3: 'R', 4: 'Q', 5: 'K', 6: 'p', 7: 'n', 8: 'b', 9: 'r', 10: 'q', 11: 'k'
        }

        count = 0
        fen = ""

        for i in range(0, 8):
            for j in range(0, 8):
                if matrix[i][j] != self.MATRIX_DEFAULT_VALUE:
                        if count != 0:
                            fen += str(count)
                            count = 0
                        fen += id_to_piece[matrix[i][j]]
                else:
                    count += 1

            if count != 0:
                fen += str(count)
                count = 0

            if i < 7:
                fen += "/"

        fen += " w KQkq - 0 1"

        return fen