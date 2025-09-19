import os
# Global Variable:
piece_to_id = {
    'P': 0, 'N': 1, 'B': 2, 'R': 3, 'Q': 4, 'K': 5,
    'p': 6, 'n': 7, 'b': 8, 'r': 9, 'q': 10, 'k': 11
}

def create_label_file(type_labels: str, labels: list, filename: str):
    """
    Creates a YOLOv8-format file from labels

    type_labels = train, test, validation

    labels = list with labels in YOLO-format (use filename_to_fen() -> board_to_yolo_label())

    filename = Name of the file we want to create
    """

    valid_types = ("train", "test", "validation")

    if type_labels not in valid_types:
        raise ValueError(f"type_labels {type_labels} is invalid. Expected one of {valid_types}")

    label_dir = f"dataset/label_{type_labels}"
    os.makedirs(label_dir, exist_ok=True)
    txt_filename = filename.replace(".jpeg", "")
    label_file = os.path.join(label_dir, f"{txt_filename}.txt")

    with open(label_file, "a") as fl:
        for label in labels:
            fl.write(f"{label}\n")
            print(label_file)

def filename_to_fen(filename: str):
    """
    Creates a FEN string from the filename of the dataset

    filename -> Image name (e.g., rrQb2k1-q3R3-PR6-8-8-K3r3-p7-n2N2N1.jpg)
    """
    
    fen_part = filename.replace('.jpeg', '')
    ranks = fen_part.split("-")
    board = []

# Convert string_fen into a matrix
    for rank in ranks:
        row = []
        for char in rank:
            if char.isdigit():
                row.extend([''] * int(char))
            else:
                row.append(char)
            
        board.append(row)
    return board

def board_to_yolo_label(board: list):
    """
    Create YOLOv8 labels from a board matrix

    board -> Matrix A.K.A list of lists
    """
    labels = []

    square_width = 1 / 8
    square_height = 1 / 8

    for row in range(8):
        for col in range(8):

            piece = board[row][col]

            if piece == '': continue
            class_id = piece_to_id[piece]

            x_center = (col + 0.5) / 8
            y_center = (row + 0.5) / 8


            label_line = f"{class_id} {x_center:.6f} {y_center:.6f} {square_width:.6f} {square_height:.6f}"
            labels.append(label_line)
            

    return labels

def create_label_folder(image_dir: str, type_labels: str):
    """
    Main function that really creates the folder and the files

    image_dir -> Where the images are coming from

    type_labels -> It will be train, test or validation?
    """
    filenames = os.listdir(image_dir)

    for filename in filenames:
        board = filename_to_fen(filename)
        labels = board_to_yolo_label(board)

        create_label_file(type_labels, labels, filename)

def main():
    create_label_folder("dataset\\test", "test")
    create_label_folder("dataset\\train", "train")



# def delete_txt_files():
#     files = os.listdir("dataset\\train")

#     for fl in files:
#         if fl.endswith(".txt"):
#             file_path = os.path.join("dataset\\train", fl)
#             os.remove(file_path)
#             print("Removendo ", file_path)



# def delete_txt_files():
#     files = os.listdir("dataset\\images\\train")
#     files1 = os.listdir("dataset\\labels\\test")

#     print(len(files) + len(files1))    



# if __name__ == "__main__":
#     delete_txt_files()