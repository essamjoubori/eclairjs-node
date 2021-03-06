/*
 * Copyright 2016 IBM Corp.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var Utils = require('../../utils.js');

var Estimator = require('../Estimator')();

var gKernelP;

/**
 * @classdesc
 * Validation for hyper-parameter tuning.
 * Randomly splits the input dataset into train and validation sets,
 * and uses evaluation metric on the validation set to select the best model.
 * Similar to {@link CrossValidator}, but only splits the set once.
 * @class
 * @memberof module:eclairjs/ml/tuning
 * @extends module:eclairjs/ml.Estimator
 * @param {string} [uid]
 */
function TrainValidationSplit() {
  Utils.handleConstructor(this, arguments, gKernelP);
}

TrainValidationSplit.prototype = Object.create(Estimator.prototype);

TrainValidationSplit.prototype.constructor = TrainValidationSplit;

/**
 * An immutable unique ID for the object and its derivatives.
 * @returns {Promise.<string>}
 */
TrainValidationSplit.prototype.uid = function () {
  var args = {
    target: this,
    method: 'uid',
    args: Utils.wrapArguments(arguments),
    returnType: String
  };

  return Utils.generate(args);
};

/**
 * @param {module:eclairjs/ml.Estimator} value
 * @returns {module:eclairjs/ml/tuning.TrainValidationSplit}
 */
TrainValidationSplit.prototype.setEstimator = function(value) {
  var args = {
    target: this,
    method: 'setEstimator',
    args: Utils.wrapArguments(arguments),
    returnType: TrainValidationSplit
  };

  return Utils.generate(args);
};

/**
 * @param {ParamMap[]} value
 * @returns {module:eclairjs/ml/tuning.TrainValidationSplit}
 */
TrainValidationSplit.prototype.setEstimatorParamMaps = function(value) {
  var args = {
    target: this,
    method: 'setEstimatorParamMaps',
    args: Utils.wrapArguments(arguments),
    returnType: TrainValidationSplit
  };

  return Utils.generate(args);
};

/**
 * @param {module:eclairjs/ml/evaluation.Evaluator} value
 * @returns {module:eclairjs/ml/tuning.TrainValidationSplit}
 */
TrainValidationSplit.prototype.setEvaluator = function(value) {
  var args = {
    target: this,
    method: 'setEvaluator',
    args: Utils.wrapArguments(arguments),
    returnType: TrainValidationSplit
  };

  return Utils.generate(args);
};

/**
 * @param {number} value
 * @returns {module:eclairjs/ml/tuning.TrainValidationSplit}
 */
TrainValidationSplit.prototype.setTrainRatio = function(value) {
  var args = {
    target: this,
    method: 'setTrainRatio',
    args: Utils.wrapArguments(arguments),
    returnType: TrainValidationSplit
  };

  return Utils.generate(args);
};

/**
 * @param {module:eclairjs/sql.DataFrame} dataset
 * @returns {module:eclairjs/ml/tuning.TrainValidationSplitModel}
 */
TrainValidationSplit.prototype.fit = function(dataset) {
  var TrainValidationSplitModel = require('./TrainValidationSplitModel')();

  var args = {
    target: this,
    method: 'fit',
    args: Utils.wrapArguments(arguments),
    returnType: TrainValidationSplitModel
  };

  return Utils.generate(args);
};

/**
 * @param {module:eclairjs/sql/types.StructType} schema
 * @returns {module:eclairjs/sql/types.StructType}
 */
TrainValidationSplit.prototype.transformSchema = function(schema) {
  var StructType = require('../../sql/types/StructType')();

  var args = {
    target: this,
    method: 'transformSchema',
    args: Utils.wrapArguments(arguments),
    returnType: StructType
  };

  return Utils.generate(args);
};

/**
 * @returns {Promise.<Void>} A Promise that resolves to nothing.
 */
TrainValidationSplit.prototype.validateParams = function() {
  var args = {
    target: this,
    method: 'validateParams',
    args: Utils.wrapArguments(arguments),
    returnType: null
  };

  return Utils.generate(args);
};

/**
 * @param {module:eclairjs/ml/param.ParamMap} extra
 * @returns {module:eclairjs/ml/tuning.TrainValidationSplit}
 */
TrainValidationSplit.prototype.copy = function(extra) {
  var args = {
    target: this,
    method: 'copy',
    args: Utils.wrapArguments(arguments),
    returnType: TrainValidationSplit
  };

  return Utils.generate(args);
};

TrainValidationSplit.moduleLocation = '/ml/tuning/TrainValidationSplit';

module.exports = function(kP) {
  if (kP) gKernelP = kP;

  return TrainValidationSplit;
};