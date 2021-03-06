/*
 * Copyright 2015 IBM Corp.
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

function exit() {
  process.exit();
}

function stop(e) {
  if (e) {
    console.log(e);
  }
  sc.stop().then(exit).catch(exit);
}

var spark = require('../../lib/index.js');

function run(sc) {
  return new Promise(function(resolve, reject) {
    var sqlContext = new spark.sql.SQLContext(sc);

    // Load training data
    var training = sqlContext.read().format("libsvm")
      .load(__dirname+"/../mllib/data/sample_libsvm_data.txt");

    var lr = new spark.ml.classification.LogisticRegression()
      .setMaxIter(10)
      .setRegParam(0.3)
      .setElasticNetParam(0.8);

    // Fit the model
    var lrModel = lr.fit(training);

    // Extract the summary from the returned LogisticRegressionModel instance trained in the earlier
    // example
    var binarySummary = lrModel.summary();

    var promises = [];
    promises.push(binarySummary.objectiveHistory());
    //promises.push(binarySummary.areaUnderROC());

    Promise.all(promises).then(resolve).catch(reject);
  });
}

if (global.SC) {
  // we are being run as part of a test
  module.exports = run;
} else {
  var sc = new spark.SparkContext("local[*]", "Logistic Regression Summary");
  run(sc).then(function(results) {
    console.log("objectiveHistory:",results[0]);
    //console.log("areaUnderROC:",results[1]);
    stop();
  }).catch(stop);
}