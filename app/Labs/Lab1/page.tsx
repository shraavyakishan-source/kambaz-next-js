export default function Lab1(){
    return (
        <div id ="wd-lab1">
            <h2>Lab1</h2>
            <h3>HTML Examples</h3>
            <div id ="wd-h-tag">
                <h4>Heading tags</h4>
                <div id="wd-p-tag">
                    <h4>Paragraph tag</h4>
                    <div id="wd-p-1">
                    <p>This is the first paragraph</p>
                    <p id="wd-p-2">
                        this is the second paragraph </p>
                <h4>List tags</h4>
                <div id="wd-your-favourite-recipe">
                    <h3>My favourite recipe</h3>
                    How to make Pasta
                   <ol>
                    <li>Take about 2 cups of pasta and boil it until its cooked well</li>
                    <li>Add 3 tbsp of butter and garlic to a pan, once melted add chilli flakes</li>
                    <li>Add the pasta to the pan and combine everything</li>
                    <li>Add salt and pepper to taste</li>
                    <li>Add parsley and parmesan cheese on top</li>
                    <li>serve and enjoy</li>
                   </ol>
                   <div id="wd-your-books">
                    <h3>My favourite books</h3>
                    <ul>
                        <li>Harry potter</li>
                        <li>it ends with us</li>
                        <li>Lord of the rings</li>
                        <li>Manga</li>
                    </ul>
                    <div id="wd-tables">
                        <h4>Table Tag</h4>
                        <table border={1} width="100%"> 
                            <thead>
                                <tr>
                                    <th>Quiz</th>
                                    <th>Topic</th>
                                    <th>Date</th>
                                    <th>Grade</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Q1</td>
                                    <td>HTML</td>
                                    <td>3/2/24</td>
                                    <td>95</td>
                                </tr>
                                <tr>
                                    <td>Q2</td>
                                    <td>CSS</td>
                                    <td>3/9/24</td>
                                    <td>92</td>
                                </tr>
                                <tr>
                                    <td>Q3</td>
                                    <td>JavaScript</td>
                                    <td>3/15/24</td>
                                    <td>94</td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colSpan={3}>Average</td>
                                    <td>94</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                   </div>
                   </div>
                </div>
                </div>
            </div>
        </div>
    );
}