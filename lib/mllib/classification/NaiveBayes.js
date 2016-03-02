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
var RDD = require('../../rdd/RDD.js');

var NaiveBayesModel = require('./NaiveBayesModel')();

var gKernelP;

/**
 * Trains a Naive Bayes model given an RDD of `(label, features)` pairs.
 *
 * This is the Multinomial NB ([[http://tinyurl.com/lsdw6p]]) which can handle all kinds of
 * discrete data.  For example, by converting documents into TF-IDF vectors, it can be used for
 * document classification.  By making every vector a 0-1 vector, it can also be used as
 * Bernoulli NB ([[http://tinyurl.com/p7c96j6]]). The input feature values must be nonnegative.
 * @classdesc
 */

/**
 * @param {number} lambda
 * @returns {??}
 *  @class
 */
function NaiveBayes() {
  if (arguments.length == 2) {
    // Someone created an instance of this class for us
    this.kernelP = arguments[0];
    this.refIdP = arguments[1];
  } else {
    this.kernelP = gKernelP;

    var templateStr = arguments.length == 1 ? 'var {{refId}} = new NaiveBayes({{lambda}});' : 'var {{refId}} = new NaiveBayes();';
    this.refIdP = Utils.evaluate(gKernelP, NaiveBayes, templateStr, {lambda: arguments[0]}, true);
  }
}

/**
 * @param {number} lambda
 * @returns {NaiveBayes}
 */
NaiveBayes.prototype.setLambda = function(lambda) {
  throw "not implemented by ElairJS";
//
// var templateStr = 'var {{refId}} = {{inRefId}}.setLambda({{lambda}});';
//
// return Utils.generateAssignment(this, NaiveBayes, templateStr , {lambda : lambda});
};


/**
 * @returns {Promise.<number>}
 */
NaiveBayes.prototype.getLambda = function() {
  throw "not implemented by ElairJS";
//
// function _resolve(result, resolve, reject) {
// 	var returnValue=parseInt(result)
// 	resolve(returnValue);
// };
//
// var templateStr = '{{inRefId}}.getLambda();';
// return Utils.generateResultPromise(this, templateStr  , _resolve);
};


/**
 * Set the model type using a string (case-sensitive).
 * Supported options: "multinomial" (default) and "bernoulli".
 * @param {string} modelType
 * @returns {NaiveBayes}
 */
NaiveBayes.prototype.setModelType = function(modelType) {
  throw "not implemented by ElairJS";
//
// var templateStr = 'var {{refId}} = {{inRefId}}.setModelType({{modelType}});';
//
// return Utils.generateAssignment(this, NaiveBayes, templateStr , {modelType : modelType});
};


/**
 * @returns {Promise.<string>}
 */
NaiveBayes.prototype.getModelType = function() {
  throw "not implemented by ElairJS";
//
// function _resolve(result, resolve, reject) {
// 	var returnValue=result
// 	resolve(returnValue);
// };
//
// var templateStr = '{{inRefId}}.getModelType();';
// return Utils.generateResultPromise(this, templateStr  , _resolve);
};


/**
 * Run the algorithm with the configured parameters on an input RDD of LabeledPoint entries.
 *
 * @param {RDD} data  RDD of {@link LabeledPoint}.
 * @returns {NaiveBayesModel}
 */
NaiveBayes.prototype.run = function(data) {
  throw "not implemented by ElairJS";
//
// var templateStr = 'var {{refId}} = {{inRefId}}.run({{data}});';
//
// return Utils.generateAssignment(this, NaiveBayesModel, templateStr , {data : data});
};

module.exports = NaiveBayes;
//
// static methods
//


/**
 * @param {SparkContext} sc
 * @param {string} path
 * @returns {NaiveBayesModel}
 */
NaiveBayesModel.load = function(sc,path) {
  throw "not implemented by ElairJS";
//
// var templateStr = 'var {{refId}} = NaiveBayesModel.load({{sc}},{{path}});';
//
// return Utils.generateAssignment(this, NaiveBayesModel, templateStr , {sc : sc,path : path});
};

/**
 * Trains a Naive Bayes model given an RDD of `(label, features)` pairs.
 *
 * The model type can be set to either Multinomial NB ([[http://tinyurl.com/lsdw6p]])
 * or Bernoulli NB ([[http://tinyurl.com/p7c96j6]]). The Multinomial NB can handle
 * discrete count data and can be called by setting the model type to "multinomial".
 * For example, it can be used with word counts or TF_IDF vectors of documents.
 * The Bernoulli model fits presence or absence (0-1) counts. By making every vector a
 * 0-1 vector and setting the model type to "bernoulli", the  fits and predicts as
 * Bernoulli NB.
 *
 * @param {RDD} input  RDD of `(label, array of features)` pairs.  Every vector should be a frequency
 *              vector or a count vector.
 * @param {number} lambda  Optional The smoothing parameter
 *
 * @param {string} modelType  Optional The type of NB model to fit from the enumeration NaiveBayesModels, can be
 *              multinomial or bernoulli
 * @returns {NaiveBayesModel}
 */
NaiveBayes.train = function(input, lambda, modelType) {
  var templateStr;

  if (modelType) {
    templateStr = 'var {{refId}} = NaiveBayes.train({{input}},{{lambda}},{{modelType}});';
  } else if (lambda) {
    templateStr = 'var {{refId}} = NaiveBayes.train({{input}},{{lambda}});';
  } else {
    templateStr = 'var {{refId}} = NaiveBayes.train({{input}});';
  }

  return Utils.evaluate(gKernelP, NaiveBayesModel, templateStr, {input: Utils.prepForReplacement(input), lambda: lambda, modelType: Utils.prepForReplacement(modelType)});
};

module.exports = function(kP) {
  gKernelP = kP;

  return NaiveBayes;
};