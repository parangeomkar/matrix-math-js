const Matrix = require("./matrix");
const { throwError } = require("../../ffnet2js/src/error_handler");

/**
 * 
 * @param {*} A Matrix 1 of any size
 * @param {*} B Matrix 2 of any size
 * @returns returns dot product of A and B
 */
module.exports.dot = (A, B) => {
    // temp matrix
    let _dotMat = new Matrix();
    let isVectorProduct = 0;

    // check if any matrix is null
    if (A.size(0) > 0 && B.size(0) > 0) {

        // check if A is a scalar
        if (A.size(0) == 1 && A.size(1) == 1) {

            // initialize zero matrix of A->rows and A->columns
            _dotMat.zeros(B.size(0), B.size(1));

        // check if B is a scalar
        } else if (B.size(0) == 1 && B.size(1) == 1) {
            
            // initialize zero matrix of B->rows and B->columns
            _dotMat.zeros(A.size(0), A.size(1));

            // swap A and B to allow sequence of scaler param first in multiplication
            let _mat = B;
            B = A;
            A = _mat;

        } else {
            // vector product
            isVectorProduct = 1;

            // dimensions do not match if columns of first matrix do not match rows of second matrix,
            if (A.size(1) != B.size(0)) {
                throwError("Dot product with invalid matrix dimensions is attempted!");

            } else {
                // initialize zero matrix of A->rows and B->columns
                _dotMat.zeros(A.size(0), B.size(1));
            }
        }
    } else {
        throwError("Dot product with null matrix is attempted!");
    }

    // Following logic has O(n^3) time complexity
    // iterate rows of A
    for (let i = 0; i < A.size(0); i++) {

        // iterate columns of B
        for (let j = 0; j < B.size(1); j++) {

            // iterate rows of B
            for (let k = 0; k < B.size(0); k++) {
                let temp;

                if (isVectorProduct) {
                    // compute vector dot product
                    temp = _dotMat.get(i, j) + (A.get(i, k) * B.get(k, j));
                    _dotMat.set(i, j, temp);
                    
                } else {
                    // compute scalar product
                    temp = (A.get(i, 0) * B.get(k, j));
                    _dotMat.set(k, j, temp);
                }
            }
        }
    }
    return _dotMat;
}


/**
 * 
 * @param {*} A Matrix 1 of any size
 * @param {*} B Matrix 2 of any size
 * @returns returns sum of A and B
 */
module.exports.add = (A, B) => {
    // temp matrix
    let _sumMat = new Matrix();
    let isVectorSum = 0;

    // check if any matrix is null
    if (A.size(0) > 0 && B.size(0) > 0) {

        // check if A is a scalar
        if (A.size(0) == 1 && A.size(1) == 1) {

            // initialize zero matrix of A->rows and A->columns
            _sumMat.zeros(B.size(0), B.size(1));

            // check if B is a scalar
        } else if (B.size(0) == 1 && B.size(1) == 1) {

            // initialize zero matrix of B->rows and B->columns
            _sumMat.zeros(A.size(0), A.size(1));

            // swap A and B to allow sequence of scaler param first in multiplication
            let _mat = B;
            B = A;
            A = _mat;

        } else {
            // dimensions do not match if columns of first matrix do not match rows of second matrix,
            if (A.size(0) != B.size(0) && A.size(1) != B.size(1)) {

                throwError("Summation with invalid matrix dimensions is attempted!");

            } else {
                // is a vector summation
                isVectorSum = 1;

                // initialize zero matrix of A->rows and B->columns
                _sumMat.zeros(A.size(0), B.size(1));
            }
        }
    } else {
        throwError("Summation with null matrix is attempted!");
    }

    // iterate rows of B
    for (let i = 0; i < B.size(0); i++) {

        // iterate columns of B
        for (let j = 0; j < B.size(1); j++) {
            let temp;

            if (isVectorSum) {
                // compute vector sum
                temp = A.get(i, j) + B.get(i, j);
                _sumMat.set(i, j, temp);

            } else {
                // compute scalar sum
                temp = A.get(0, 0) + B.get(i, j);
                _sumMat.set(i, j, temp);
            }
        }
    }
    return _sumMat;
}


/**
 * 
 * @param {*} A Matrix 1 of any size
 * @param {*} B Matrix 2 of any size
 * @returns returns difference between A and B
 */
module.exports.sub = (A, B) => {
    // temp matrix
    let _subMat = new Matrix();
    let reversed = 1;
    let isVectorDiff = 0;

    // check if any matrix is null
    if (A.size(0) > 0 && B.size(0) > 0) {

        // check if A is a scalar
        if (A.size(0) == 1 && A.size(1) == 1) {

            // initialize zero matrix of A->rows and A->columns
            _subMat.zeros(B.size(0), B.size(1));

            // check if B is a scalar
        } else if (B.size(0) == 1 && B.size(1) == 1) {

            // initialize zero matrix of B->rows and B->columns
            _subMat.zeros(A.size(0), A.size(1));

            // swap A and B to allow sequence of scaler param first in multiplication
            let _mat = B;
            B = A;
            A = _mat;
            reversed = -1;

        } else {

            // dimensions do not match if columns of first matrix do not match rows of second matrix,
            if (A.size(0) != B.size(0) && A.size(1) != B.size(1)) {
                throwError("Subtraction with invalid matrix dimensions is attempted!");

            } else {
                // is a vector subtraction
                isVectorDiff = 1;

                // initialize zero matrix of A->rows and B->columns
                _subMat.zeros(A.size(0), B.size(1));
            }
        }
    } else {
        throwError("Subtraction with null matrix is attempted!");
    }

    // iterate rows of B
    for (let i = 0; i < B.size(0); i++) {

        // iterate columns of B
        for (let j = 0; j < B.size(1); j++) {
            let temp;

            if (isVectorDiff) {
                // compute vector subtraction
                temp = A.get(i, j) - B.get(i, j);
                _subMat.set(i, j, temp);

            } else {
                // compute scalar subtraction
                // reverse = 1  gives (A - B), reverse = -1 gives (B - A)
                temp = (reversed * A.get(0, 0)) - (reversed * B.get(i, j));
                _subMat.set(i, j, temp);
            }
        }
    }
    return _subMat;
}




/**
 * 
 * @param {*} A Matrix of any size
 * @param {*} exp exponent
 * @returns returns element wise power of A with power exp
 */
module.exports.pow = (A, exp) => {
    // temp matrix
    let _powMat = new Matrix();

    // check if any matrix is null
    if (A.size(0) == 0) {
        throwError("Calculation of null matrix power is attempted!");
        
    } else {
        _powMat.zeros(A.size(0), A.size(1));
    }

    // iterate rows of A
    for (let i = 0; i < A.size(0); i++) {

        // iterate columns of A
        for (let j = 0; j < A.size(1); j++) {

            // compute element wise power
            let temp = Math.pow(A.get(i, j), exp);
            _powMat.set(i, j, temp);
        }
    }
    return _powMat;
}


/**
 * 
 * @param {*} A Matrix 1 of any size
 * @param {*} B Matrix 2 of any size
 * @returns returns element wise product of A and B
 */
module.exports.prod = (A, B) => {
    // temp matrix
    let _prodMat = new Matrix();

    if (A.size(0) == 0 || B.size(0) == 0) {
        throwError("Product with null matrix is attempted!");
    }

    // check if dimensions of both matrices match
    if (A.size(0) == B.size(0) && A.size(1) == B.size(1)) {

        // initialize zero matrix of size of A
        _prodMat.zeros(A.size(0), A.size(1));

    } else {
        // throw error if dimensions of two matrices do not match
        throwError("Element wise product of unequal dimension matrices is attempted!");
    }

    // iterate rows of A
    for (let i = 0; i < A.size(0); i++) {

        // iterate columns of A
        for (let j = 0; j < A.size(1); j++) {

            // compute element wise product
            let temp = A.get(i, j) * B.get(i, j);
            _prodMat.set(i, j, temp);
        }
    }
    return _prodMat;
}

