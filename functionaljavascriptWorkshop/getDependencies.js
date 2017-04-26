function getDependencies(tree, dependencies) {
  if (!dependencies)
    dependencies = [];

  if (!tree.dependencies) {
    return dependencies;
  }

  let
    depNames = Object.keys(tree.dependencies),
    currentDependencies = depNames
            .map((dependencyName) => {
              let dependencyVersion = tree.dependencies[dependencyName].version;
              return `${dependencyName}@${dependencyVersion}`;
            })
            .filter(depCurrent => dependencies.every( depOld => depOld != depCurrent));

  dependencies = dependencies.concat(currentDependencies);

  depNames.forEach( depName => {
    dependencies = getDependencies(tree.dependencies[depName], dependencies);
  });

  return dependencies.sort( (first, second) => {
    if (first < second) return -1;
    if (first > second) return 1;
    return 0;
  });
}

// var loremIpsum = {
//   "name": "lorem-ipsum",
//   "version": "0.1.1",
//   "dependencies": {
//     "optimist": {
//       "version": "0.3.7",
//       "dependencies": {
//         "wordwrap": {
//           "version": "0.0.2"
//         }
//       }
//     },
//     "inflection": {
//       "version": "1.2.6",
//       "dependencies": {
//         "optimist": {
//           "version": "0.4.7",
//           "dependencies": {
//             "wordwrap": {
//               "version": "0.0.4"
//             }
//           }
//         }
//       }
//     }
// }
// }

// console.log(getDependencies(loremIpsum));

module.exports = getDependencies;
