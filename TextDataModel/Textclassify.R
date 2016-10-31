dataDirectory <- "/Users/prashanth/Downloads/"
data <- read.csv(paste(dataDirectory, 'sunnyDataT.csv', sep=""), header = TRUE)
dtMatrix <- create_matrix(data["Text"])
container <- create_container(dtMatrix, data$IsSunny, trainSize=1:11, virgin=FALSE)
model <- train_model(container, "SVM", kernel="linear", cost=1)
predictionData <- list("sunny sunny sunny rainy rainy", "rainy sunny rainy rainy", "hello", "", "this is another rainy world")
predMatrix <- create_matrix(predictionData, originalMatrix=dtMatrix)
predSize = length(predictionData);
predictionContainer <- create_container(predMatrix, labels=rep(0,predSize), testSize=1:predSize, virgin=FALSE)
results <- classify_model(predictionContainer, model)
results
